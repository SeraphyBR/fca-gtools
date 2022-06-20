# fca-gtools

fca-gtools is a desktop formal concept analysis tool, based on the [fca-tools](https://github.com/raul4247/fca-tools) library and framework.
It was built using [Tauri](https://github.com/tauri-apps/tauri), [React](https://reactjs.org/) with [Vite](https://vitejs.dev/), and [Flask](https://flask.palletsprojects.com/)

![image](./docs/images/screenshot_fcagtools.png)

## Architecture overview

![architecture](./docs/images/arquitecture.png)

## Development environment

- This project has a shell.nix file, which describes the dependencies needed for development and execution, if you use the NixOS operating system or the Nix package manager, you can run the following commands:

```sh
# It will read the shell.nix and create a new shell
# with the necessary dependencies installed
nix-shell

# To install node_modules dependencies
yarn install

# It will start the execution and compilation of the project
# for the development environment
yarn dev:all

# If, in your linux desktop environment, you encounter problems such
# as a black window, no content. Recommend running as below
WEBKIT_DISABLE_COMPOSITING_MODE=1 yarn dev:all
```

- fca-gtools was designed with all operating systems in mind, however it has only been tested on linux environments. If you encounter any issues, feel free to enter the issues or discussions tab.