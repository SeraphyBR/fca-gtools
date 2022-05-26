use axum::{extract::Path, Json};
use uuid::Uuid;

use super::State;

use crate::server::models::{FcatoolsTriadicData, TriadicConcept, TriadicContext};

pub async fn get_fca_data_rules(
  state: State,
  Path(context_id): Path<Uuid>,
) -> Json<FcatoolsTriadicData> {
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

    let resp = state.http_client
      .post(state.fcatools_baseurl.clone() + "/rules")
      .json(&triadic_context.get_python_struct())
      .send()
      .await
      .unwrap();

    let data = resp.json::<FcatoolsTriadicData>().await.unwrap();

    Json(data)
  } else {
    todo!()
  }
}

pub async fn get_fca_data_concepts(
  state: State,
  Path(context_id): Path<Uuid>,
) -> Json<Vec<TriadicConcept>> {
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

    let resp = state.http_client
      .post(state.fcatools_baseurl.clone() + "/concepts")
      .json(&triadic_context.get_python_struct())
      .send()
      .await
      .unwrap();

    let data = resp.json::<Vec<TriadicConcept>>().await.unwrap();

    Json(data)
  } else {
    todo!()
  }
}
