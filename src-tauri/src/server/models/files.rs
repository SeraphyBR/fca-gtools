use bytes::Bytes;
use serde::{Deserialize, Serialize};

use crate::server::utils::zoom_and_enhance;

#[derive(Serialize, Deserialize)]
pub struct Project {
  pub id: String,
  pub name: String,
}

zoom_and_enhance! {
  pub struct AddProjectDto {
    pub name: String,
    pub filename: String,
    pub blob: Bytes
  }
}
