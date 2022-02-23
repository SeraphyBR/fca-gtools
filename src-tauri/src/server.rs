use axum::{routing::get, Router};
use tokio::task::JoinHandle;

async fn hello_world() -> String {
  "Hello World".to_string()
}

pub fn create_router() -> Router {
  Router::new().route("/", get(hello_world))
}

pub async fn start(addr: &'static str) -> JoinHandle<()> {
  let router = create_router();
  let rt = tokio::runtime::Handle::current();
  let rt_ = rt.clone();
  rt.spawn_blocking(move || {
    rt_.block_on(async {
      let local = tokio::task::LocalSet::new();
      local
        .run_until(axum::Server::bind(&addr.parse().unwrap()).serve(router.into_make_service()))
        .await
        .unwrap();
    })
  })
}
