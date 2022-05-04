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

use crate::server::routes::State;

pub async fn add_context_with_file_handler(
  state: State,
  multipart: Multipart,
) -> Result<(), StatusCode> {
  let new_context = extract_struct_from_multipart::<AddContextDto>(multipart)
    .await
    .unwrap();

  println!("{:?}", new_context);

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

pub async fn get_contexts_handler(state: State) -> Json<Vec<Context>> {
  let result = sqlx::query_as!(Context, "SELECT id, name FROM contexts")
    .fetch_all(&state.db)
    .await
    .unwrap();

  Json(result)
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
