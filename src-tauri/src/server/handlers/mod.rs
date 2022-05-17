use super::ApiState;
use axum::extract;
use std::sync::Arc;

pub mod contexts_handler;
pub mod fcatools_handler;

type State = extract::Extension<Arc<ApiState>>;
