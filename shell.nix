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
        libselinux
    ];
    nativeBuildInputs = with pkgs; [
        rust_channel
        cargo-edit
        nodejs
        yarn
        appimage-run
        wget
        curl
        # Use steam-run, for a fhs enviroment, allow vscode code-lldb debugger to run
        # $ steam-run code .
        # $ steam-run yarn cpyress:open
        (steam.override {
            extraPkgs = pkgs: [ pkg-config zsh ];
            extraLibraries = pkgs: [ zlib openssl libselinux ];
            nativeOnly = true;
        }).run
    ];
}

# https://github.com/NixOS/nixpkgs/issues/32580
# It may be necessary to pass this variable before running:
# WEBKIT_DISABLE_COMPOSITING_MODE=1 yarn tauri dev