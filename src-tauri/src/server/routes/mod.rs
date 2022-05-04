use std::sync::Arc;

use axum::{
  extract,
  routing::{delete, get, post},
  Router,
};

use crate::server::ApiState;

mod contexts_handler;
mod fca_tools_handler;

pub type State = extract::Extension<Arc<ApiState>>;

pub fn contexts_router() -> Router {
  Router::new()
    .route("/", post(contexts_handler::add_context_with_file))
    .route("/", get(contexts_handler::get_contexts_handler))
    .route("/", delete(contexts_handler::delete_all_contexts))
    .route(
      "/:context_id",
      get(contexts_handler::get_context_data_by_id),
    )
}

pub fn fca_tools_router() -> Router {
  Router::new().route("/:project_id", get(fca_tools_handler::get_fca_data))
}
