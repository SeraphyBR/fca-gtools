#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod server;
use tauri::{
  api::{
    path::{resolve_path, BaseDirectory},
    process::Command,
  },
  Manager,
};

struct TauriState {
  server_port: u16
}

#[tauri::command]
fn get_server_port(state: tauri::State<TauriState>) -> u16 {
  return state.server_port
}

fn main() {
  let server_port = port_selector::select_from_given_port(8080).unwrap();
  let server_addr = format!("0.0.0.0:{}", server_port);

  tauri::Builder::default()
    .setup(|app| {
      let local_data_dir = resolve_path(
        &app.config(),
        app.package_info(),
        &app.env(),
        "",
        Some(BaseDirectory::LocalData),
      )
      .unwrap();

      let flask_port = port_selector::select_from_given_port(5000).unwrap().to_string();

      let fcatools_baseurl = format!("http://127.0.0.1:{}/fcatools", flask_port);

      tauri::async_runtime::spawn_blocking(move || {
        Command::new_sidecar("flask")
          .expect("Failed to create 'flask' binary command")
          .args(["127.0.0.1", &flask_port])
          .spawn()
          .unwrap()
      });

      tauri::async_runtime::spawn_blocking(move || server::start(server_addr, &local_data_dir, fcatools_baseurl));

      Ok(())
    })
    .manage(TauriState {server_port })
    .invoke_handler(tauri::generate_handler![get_server_port])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
