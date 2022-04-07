use axum::{
  routing::{delete, get, post},
  Router,
};

mod files_handler;

pub fn files_router() -> Router {
  Router::new()
    .route("/", post(files_handler::add_project_with_file_handler))
    .route("/", get(files_handler::get_projects_handler))
    .route("/", delete(files_handler::delete_all_projects))
}
