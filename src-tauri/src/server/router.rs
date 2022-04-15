use crate::server::routes;
use axum::Router;
use tower_http::cors;
use tower_http::cors::CorsLayer;

pub fn api_router() -> Router {
  Router::new()
    .nest("/files", routes::files_router())
    .nest("/fca", routes::fca_tools_router())
    .layer(
      CorsLayer::new()
        .allow_origin(cors::Any)
        .allow_methods(cors::Any),
    )
}
