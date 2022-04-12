use crate::server::{
  models::{AddProjectDto, Project},
  utils::extract_struct_from_multipart,
};
use axum::{extract::Multipart, http::StatusCode, Json};
use uuid::Uuid;

use crate::server::routes::Context;

pub async fn add_project_with_file_handler(
  ctx: Context,
  multipart: Multipart,
) -> Result<(), StatusCode> {
  let new_project = extract_struct_from_multipart::<AddProjectDto>(multipart)
    .await
    .unwrap();

  println!("{:?}", new_project);

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

  Ok(())
}

pub async fn get_projects_handler(ctx: Context) -> Json<Vec<Project>> {
  let result = sqlx::query_as!(Project, "SELECT id, name FROM projects")
    .fetch_all(&ctx.db)
    .await
    .unwrap();

  Json(result)
}

pub async fn delete_all_projects(ctx: Context) {
  sqlx::query!("DELETE FROM projects")
    .execute(&ctx.db)
    .await
    .unwrap();
}
