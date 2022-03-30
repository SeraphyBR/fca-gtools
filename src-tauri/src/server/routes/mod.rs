use axum::{routing::post, Router};

mod files_handler;

pub fn files_router() -> Router {
  Router::new().route("/add", post(files_handler::add_project_with_file_handler))
}
