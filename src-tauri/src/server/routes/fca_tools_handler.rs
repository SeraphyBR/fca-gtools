use axum::extract::Path;
use uuid::Uuid;

use crate::server::{models::TriadicContext, routes::Context};

pub async fn get_fca_data(ctx: Context, Path(project_id): Path<Uuid>) {
  let id = project_id.to_string();

  struct QueryData {
    fileblob: Option<Vec<u8>>,
  }

  // obter arquivo json válido exemplo atilio
  let query_data = sqlx::query_as!(QueryData, "SELECT fileblob FROM projects WHERE id = ?", id)
    .fetch_one(&ctx.db)
    .await
    .unwrap();

  if let Some(blob) = query_data.fileblob {
    let triadic_context: TriadicContext = serde_json::from_slice(blob.as_slice()).unwrap();

    let resp = reqwest::Client::new()
      .post("http://127.0.0.1:5000/fcatools")
      .json(&triadic_context.get_python_struct())
      .send()
      .await
      .unwrap();

    println!("{:?}", resp);
  } else {
    todo!()
  }

  // criar a struct python com os dados do arquivo em cada campo
  // executar funções python do fca_tools
  todo!()
}
