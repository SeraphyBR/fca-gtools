let
    rust_overlay = import (builtins.fetchTarball "https://github.com/oxalica/rust-overlay/archive/master.tar.gz");
    nixpkgs = import <nixpkgs> { overlays = [ rust_overlay ]; };
    rust_channel = nixpkgs.rust-bin.fromRustupToolchainFile ./rust-toolchain.toml;
in

with nixpkgs;

pkgs.mkShell {
    buildInputs = [
        rust_channel
        cargo-edit
        nodejs
        yarn
        libappindicator
        wget
        curl
        webkitgtk
        openssl
        appimage-run
        patchelf
        librsvg
        gtk3
    ];
    nativeBuildInputs = with pkgs; [
        pkg-config
    ];
  }
