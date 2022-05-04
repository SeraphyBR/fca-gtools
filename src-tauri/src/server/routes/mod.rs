use std::sync::Arc;

use axum::{
  extract,
  routing::{delete, get, post},
  Router,
};

use crate::server::ApiState;

mod fca_tools_handler;
mod files_handler;

pub type State = extract::Extension<Arc<ApiState>>;

pub fn contexts_router() -> Router {
  Router::new()
    .route("/", post(files_handler::add_context_with_file_handler))
    .route("/", get(files_handler::get_contexts_handler))
    .route("/", delete(files_handler::delete_all_contexts))
    .route("/:context_id", get(files_handler::get_context_data_by_id))
}

pub fn fca_tools_router() -> Router {
  Router::new().route("/:project_id", get(fca_tools_handler::get_fca_data))
}
