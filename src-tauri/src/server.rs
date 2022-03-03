use axum::{routing::get, Router};
use pyo3::prelude::*;
use tokio::task::JoinHandle;
use tower_http::cors;
use tower_http::cors::CorsLayer;

async fn hello_world() -> String {
  "Hello World".to_string()
}

async fn hello_python() -> String {
  let gil = Python::acquire_gil();
  let py = gil.python();

  String::from("")
}

pub fn create_router() -> Router {
  Router::new()
    .route("/", get(hello_world))
    .layer(CorsLayer::new().allow_origin(cors::Any))
}

pub async fn start(addr: &'static str) -> JoinHandle<()> {
  let router = create_router();
  let rt = tokio::runtime::Handle::current();
  let rt_ = rt.clone();
  rt.spawn_blocking(move || {
    rt_.block_on(async {
      let local = tokio::task::LocalSet::new();
      local
        .run_until(axum::Server::bind(&addr.parse().unwrap()).serve(router.into_make_service()))
        .await
        .unwrap();
    })
  })
}
