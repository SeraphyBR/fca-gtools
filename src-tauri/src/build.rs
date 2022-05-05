use std::fs;
use std::process::Command;
use tauri_build;

fn build_and_move_python_api_sidecar() {
  Command::new("python")
    .arg("../src-flask/build.py")
    .output()
    .expect("Error when running src-flask/build.py");

  fs::create_dir_all("binaries").expect("Error on create directory 'binaries'");

  let target = std::env::var("TARGET").unwrap();

  fs::copy("../src-flask/dist/main", "binaries/flask").expect("Could not copy python api binary");
  fs::copy(
    "../src-flask/dist/main",
    format!("binaries/flask-{}", target),
  )
  .expect("Could not copy python api binary with target");
}

fn main() {
  build_and_move_python_api_sidecar();
  tauri_build::build()
}
