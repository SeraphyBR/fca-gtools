use std::env;
use std::fs;
use std::str::FromStr;
use std::sync::Arc;

use axum::extract::Extension;
use directories::ProjectDirs;
use dotenv::dotenv;
use sqlx::sqlite::{SqliteConnectOptions, SqlitePoolOptions};
use sqlx::SqlitePool;

mod handlers;
mod models;
mod router;
mod utils;

#[derive(Clone)]
pub struct ApiState {
  db: SqlitePool,
}

#[tokio::main]
pub async fn start(addr: &'static str) {
  dotenv().ok();

  let database_url: String;

  if cfg!(debug_assertions) {
    database_url = env::var("DATABASE_URL").unwrap()
  } else {
    let project_dirs = ProjectDirs::from("", "", "tauri-app").unwrap();
    let data_local_dir = project_dirs.data_local_dir();
    fs::create_dir_all(data_local_dir).unwrap();
    database_url = format!("sqlite:{}/storage.sqlite", data_local_dir.to_str().unwrap());
  }

  let db_connection_options = SqliteConnectOptions::from_str(&database_url)
    .unwrap()
    .create_if_missing(true);

  let db = SqlitePoolOptions::new()
    .connect_with(db_connection_options)
    .await
    .unwrap();

  sqlx::migrate!().run(&db).await.unwrap();

  let shared_state = Arc::new(ApiState { db });
  let app = router::api_router().layer(Extension(shared_state));

  axum::Server::bind(&addr.parse().unwrap())
    .serve(app.into_make_service())
    .await
    .unwrap();
}