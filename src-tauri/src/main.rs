#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod server;
use tauri::api::process::Command;

fn main() {
  tauri::Builder::default()
    .setup(|_app| {
      tauri::async_runtime::spawn_blocking(|| server::start("0.0.0.0:8080"));
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
