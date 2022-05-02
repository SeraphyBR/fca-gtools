use crate::server::{
  models::{AddProjectDto, Project, TriadicContext, TriadicContextData},
  utils::extract_struct_from_multipart,
};
use axum::{
  extract::{Multipart, Path},
  http::StatusCode,
  Json,
};
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

pub async fn get_context_from_project(
  ctx: Context,
  Path(project_id): Path<Uuid>,
) -> Json<TriadicContextData> {
  let id = project_id.to_string();
  struct QueryData {
    fileblob: Option<Vec<u8>>,
  }

  let query_data = sqlx::query_as!(QueryData, "SELECT fileblob FROM projects WHERE id = ?", id)
    .fetch_one(&ctx.db)
    .await
    .unwrap();

  if let Some(blob) = query_data.fileblob {
    let triadic_context: TriadicContext = serde_json::from_slice(blob.as_slice()).unwrap();

    let triadic_data = triadic_context.get_front_struct();

    return Json(triadic_data);
  }

  todo!()
}
