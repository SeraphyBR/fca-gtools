use axum::{
  routing::{delete, get, post, put},
  Router,
};
use tower_http::cors;
use tower_http::cors::CorsLayer;

use super::handlers::*;

pub fn contexts_router() -> Router {
  Router::new()
    .route("/file", post(contexts_handler::add_context_with_file))
    .route("/", post(contexts_handler::add_context_with_data))
    .route("/", get(contexts_handler::get_contexts))
    .route("/", delete(contexts_handler::delete_all_contexts))
    .route(
      "/:context_id",
      delete(contexts_handler::delete_context_by_id),
    )
    .route(
      "/:context_id",
      get(contexts_handler::get_context_data_by_id),
    )
    .route("/:context_id", put(contexts_handler::update_context_data))
}

pub fn fca_tools_router() -> Router {
  Router::new()
    .route(
      "/:context_id/rules",
      get(fcatools_handler::get_fca_data_rules),
    )
    .route(
      "/:context_id/concepts",
      get(fcatools_handler::get_fca_data_concepts),
    )
}

pub fn api_router() -> Router {
  Router::new()
    .nest("/contexts", contexts_router())
    .nest("/fca", fca_tools_router())
    .layer(
      CorsLayer::new()
        .allow_origin(cors::Any)
        .allow_methods(cors::Any)
        .allow_headers(cors::Any),
    )
}
