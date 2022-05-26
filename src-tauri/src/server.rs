use std::env;
use std::fs;
use std::path::PathBuf;
use std::str::FromStr;
use std::sync::Arc;

use axum::extract::Extension;
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
  http_client: reqwest::Client,
  fcatools_baseurl: String
}

#[tokio::main]
pub async fn start(addr: String, local_data_dir: &PathBuf, fcatools_baseurl: String) {
  dotenv().ok();

  let database_url: String;

  if cfg!(debug_assertions) {
    database_url = env::var("DATABASE_URL").unwrap()
  } else {
    fs::create_dir_all(local_data_dir).unwrap();
    database_url = format!("sqlite:{}/storage.sqlite", local_data_dir.to_str().unwrap());
  }

  let db_connection_options = SqliteConnectOptions::from_str(&database_url)
    .unwrap()
    .create_if_missing(true);

  let db = SqlitePoolOptions::new()
    .connect_with(db_connection_options)
    .await
    .unwrap();

  sqlx::migrate!().run(&db).await.unwrap();

  let http_client = reqwest::Client::new();

  let shared_state = Arc::new(ApiState { db, http_client, fcatools_baseurl });

  let app = router::api_router().layer(Extension(shared_state));

  axum::Server::bind(&addr.parse().unwrap())
    .serve(app.into_make_service())
    .await
    .unwrap();
}
