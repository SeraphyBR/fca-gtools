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

fn main() {
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

      tauri::async_runtime::spawn_blocking(move || server::start("0.0.0.0:8080", &local_data_dir));
      tauri::async_runtime::spawn_blocking(|| {
        Command::new_sidecar("flask")
          .expect("Failed to create 'flask' binary command")
          .spawn()
          .unwrap()
      });

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
