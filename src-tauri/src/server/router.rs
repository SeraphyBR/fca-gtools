use crate::server::routes;
use axum::{routing::get, Router};
use pyo3::prelude::*;
use tower_http::cors;
use tower_http::cors::CorsLayer;

async fn hello_python() -> String {
  let gil = Python::acquire_gil();
  let py = gil.python();
  let result = py.eval("'Hello Python'", None, None).unwrap();
  result.to_string()
}

pub fn api_router() -> Router {
  Router::new()
    .route("/", get(hello_python))
    .nest("/files", routes::files_router())
    .layer(CorsLayer::new().allow_origin(cors::Any))
}