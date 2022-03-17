use std::env;
use std::str::FromStr;
use std::sync::Arc;

use axum::extract::Extension;
use dotenv::dotenv;
use sqlx::sqlite::{SqliteConnectOptions, SqlitePoolOptions};
use sqlx::SqlitePool;

mod router;
mod routes;

#[derive(Clone)]
pub struct ApiContext {
  db: SqlitePool,
}

#[tokio::main]
pub async fn start(addr: &'static str) {
  dotenv().ok();

  let db_connection_options = SqliteConnectOptions::from_str(&env::var("DATABASE_URL").unwrap())
    .unwrap()
    .create_if_missing(true);

  let db = SqlitePoolOptions::new()
    .connect_with(db_connection_options)
    .await
    .unwrap();

  sqlx::migrate!().run(&db).await.unwrap();

  let shared_state = Arc::new(ApiContext { db });
  let app = router::api_router().layer(Extension(shared_state));

  axum::Server::bind(&addr.parse().unwrap())
    .serve(app.into_make_service())
    .await
    .unwrap();
}
