use bytes::Bytes;

use crate::server::utils::zoom_and_enhance;

zoom_and_enhance! {
  pub struct AddProjectDto {
    pub name: String,
    pub filename: String,
    pub blob: Bytes
  }
}
