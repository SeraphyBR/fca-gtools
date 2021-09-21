let
    rust_overlay = import (builtins.fetchTarball "https://github.com/oxalica/rust-overlay/archive/master.tar.gz");
    nixpkgs = import <nixpkgs> { overlays = [ rust_overlay ]; };
    rust_channel = nixpkgs.rust-bin.fromRustupToolchainFile ./rust-toolchain.toml;
in

with nixpkgs;

pkgs.mkShell {
    buildInputs = [
        stdenv
        zlib
        glib
        pkg-config
        libsoup
        libappindicator
        webkitgtk
        openssl
        patchelf
        librsvg
        gtk3
        gdk-pixbuf
        glib-networking
    ];
    nativeBuildInputs = with pkgs; [
        rust_channel
        cargo-edit
        nodejs
        yarn
        appimage-run
        wget
        curl
    ];
  }
