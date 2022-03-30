use std::sync::Arc;

use crate::server::{models::AddProjectDto, utils::extract_struct_from_multipart, ApiContext};
use axum::extract::{self, Multipart};
use uuid::Uuid;

type Context = extract::Extension<Arc<ApiContext>>;

pub async fn add_project_with_file_handler(ctx: Context, multipart: Multipart) {
  let new_project = extract_struct_from_multipart::<AddProjectDto>(multipart)
    .await
    .unwrap();

  let new_project_id = Uuid::new_v4().to_string();
  let blob_ref = new_project.blob.as_ref();

  sqlx::query!(
    r#"
    INSERT INTO projects (id, name, filename, fileblob, deleted, created_timestamp)
    VALUES ($1, $2, $3, $4, FALSE, strftime('%s','now'))
    "#,
    new_project_id,
    new_project.name,
    new_project.filename,
    blob_ref
  )
  .execute(&ctx.db)
  .await
  .unwrap();
}
