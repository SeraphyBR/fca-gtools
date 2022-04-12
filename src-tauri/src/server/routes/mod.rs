use std::sync::Arc;

use axum::{
  extract,
  routing::{delete, get, post},
  Router,
};

use crate::server::ApiContext;

mod fca_tools_handler;
mod files_handler;

pub type Context = extract::Extension<Arc<ApiContext>>;

pub fn files_router() -> Router {
  Router::new()
    .route("/", post(files_handler::add_project_with_file_handler))
    .route("/", get(files_handler::get_projects_handler))
    .route("/", delete(files_handler::delete_all_projects))
}

pub fn fca_tools_router() -> Router {
  Router::new().route("/:project_id", get(fca_tools_handler::get_fca_data))
}
