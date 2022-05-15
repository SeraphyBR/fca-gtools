use crate::server::{
  models::{AddContextDto, Context, TriadicContext, TriadicContextData},
  utils::extract_struct_from_multipart,
};
use axum::{
  extract::{Multipart, Path},
  http::StatusCode,
  Json,
};
use uuid::Uuid;

use super::State;

pub async fn add_context_with_file(state: State, multipart: Multipart) -> Result<(), StatusCode> {
  let new_context = extract_struct_from_multipart::<AddContextDto>(multipart)
    .await
    .unwrap();

  let new_context_id = Uuid::new_v4().to_string();
  let blob_ref = new_context.blob.as_ref();

  sqlx::query!(
    r#"
    INSERT INTO contexts (id, name, filename, fileblob, deleted, created_timestamp)
    VALUES ($1, $2, $3, $4, FALSE, strftime('%s','now'))
    "#,
    new_context_id,
    new_context.name,
    new_context.filename,
    blob_ref
  )
  .execute(&state.db)
  .await
  .unwrap();

  Ok(())
}

pub async fn get_contexts(state: State) -> Json<Vec<Context>> {
  let result = sqlx::query_as!(Context, "SELECT id, name FROM contexts")
    .fetch_all(&state.db)
    .await
    .unwrap();

  Json(result)
}

pub async fn delete_context_by_id(state: State, Path(context_id): Path<Uuid>) {
  let id = context_id.to_string();

  sqlx::query!("DELETE FROM contexts WHERE id = ?", id)
    .execute(&state.db)
    .await
    .unwrap();
}

pub async fn delete_all_contexts(state: State) {
  sqlx::query!("DELETE FROM contexts")
    .execute(&state.db)
    .await
    .unwrap();
}

pub async fn get_context_data_by_id(
  state: State,
  Path(context_id): Path<Uuid>,
) -> Json<TriadicContextData> {
  let id = context_id.to_string();
  struct QueryData {
    fileblob: Option<Vec<u8>>,
  }

  let query_data = sqlx::query_as!(QueryData, "SELECT fileblob FROM contexts WHERE id = ?", id)
    .fetch_one(&state.db)
    .await
    .unwrap();

  if let Some(blob) = query_data.fileblob {
    let triadic_context: TriadicContext = serde_json::from_slice(blob.as_slice()).unwrap();

    let triadic_data = triadic_context.get_front_struct();

    return Json(triadic_data);
  }

  todo!()
}

pub async fn update_context_data(
  state: State,
  Path(context_id): Path<Uuid>,
  Json(context_data): Json<TriadicContextData>,
) {
  let id = context_id.to_string();

  let context = TriadicContext::from_data(context_data);

  if let Ok(json_blob) = serde_json::to_vec(&context) {
    let fileblob = json_blob.as_slice();

    sqlx::query!(
      "UPDATE contexts SET fileblob = ? WHERE id = ?",
      fileblob,
      id
    )
    .execute(&state.db)
    .await
    .unwrap();

    return;
  }

  todo!()
}

pub async fn add_context_with_data(state: State, Json(context_data): Json<TriadicContextData>) {
  let context = TriadicContext::from_data(context_data);
  let new_context_id = Uuid::new_v4().to_string();
  let new_context_filename = format!("{}.json", context.name);

  if let Ok(json_blob) = serde_json::to_vec(&context) {
    let fileblob = json_blob.as_slice();

    sqlx::query!(
      r#"
      INSERT INTO contexts (id, name, filename, fileblob, deleted, created_timestamp)
      VALUES ($1, $2, $3, $4, FALSE, strftime('%s','now'))
      "#,
      new_context_id,
      context.name,
      new_context_filename,
      fileblob
    )
    .execute(&state.db)
    .await
    .unwrap();

    return;
  }

  todo!()
}
