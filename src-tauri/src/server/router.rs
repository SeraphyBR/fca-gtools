use axum::{
  routing::{delete, get, post},
  Router,
};
use tower_http::cors;
use tower_http::cors::CorsLayer;

use super::handlers::*;

pub fn contexts_router() -> Router {
  Router::new()
    .route("/", post(contexts_handler::add_context_with_file))
    .route("/", get(contexts_handler::get_contexts))
    .route("/", delete(contexts_handler::delete_all_contexts))
    .route(
      "/:context_id",
      get(contexts_handler::get_context_data_by_id),
    )
}

pub fn fca_tools_router() -> Router {
  Router::new().route("/:project_id", get(fca_tools_handler::get_fca_data))
}

pub fn api_router() -> Router {
  Router::new()
    .nest("/contexts", contexts_router())
    .nest("/fca", fca_tools_router())
    .layer(
      CorsLayer::new()
        .allow_origin(cors::Any)
        .allow_methods(cors::Any),
    )
}
