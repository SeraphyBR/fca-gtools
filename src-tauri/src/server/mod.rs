use std::env;
use std::sync::Arc;

use axum::extract::Extension;
use dotenv::dotenv;
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;
use tokio::task::JoinHandle;

mod router;

#[derive(Clone)]
pub struct ApiContext {
  db: SqlitePool,
}

pub async fn start_inside_tauri(addr: &'static str) -> JoinHandle<()> {
  dotenv().ok();

  let db = SqlitePoolOptions::new()
    .connect(&env::var("DATABASE_URL").unwrap())
    .await
    .unwrap();

  sqlx::migrate!().run(&db).await.unwrap();

  let shared_state = Arc::new(ApiContext { db });
  let app = router::api_router().layer(Extension(shared_state));

  let rt = tokio::runtime::Handle::current();
  let rt_ = rt.clone();
  rt.spawn_blocking(move || {
    rt_.block_on(async {
      let local = tokio::task::LocalSet::new();
      local
        .run_until(axum::Server::bind(&addr.parse().unwrap()).serve(app.into_make_service()))
        .await
        .unwrap();
    })
  })
}
