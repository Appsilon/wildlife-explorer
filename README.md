# Wildlife Explorer

A desktop application that allows bioconservation researchers to classify camera trap animal images and analyze the results.

The application is multi-platform. We support MacOS, Linux and Windows 10. Primary focus is on Windows 10.

## Maintainers

- [Marek Rogala](https://github.com/marekrogala)
- [Kamil Żyła](https://github.com/kamilzyla)
- [Tomasz Dziopa](https://github.com/tomecki)
- [Wojciech Dziwulski](https://github.com/wojdziw)

## Development

### Basic information

- We're using Electron. The app is based on https://github.com/electron-react-boilerplate/electron-react-boilerplate], which internally uses https://github.com/electron-userland/electron-builder.
- Useful files (sample data, biomonitoring stations, icons) can be found on our [Drive](https://drive.google.com/drive/folders/1eQWuf5WCT429xogQ2HiZqapehvweAtxP) (Appsilon internal).

### Dev environment setup

- Install Yarn (on Ubuntu: https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/) -- for node packages management, we will use https://yarnpkg.com/. This is recommended by Electron Builder (npm can lead to errors).
- Editor configuration: https://electron-react-boilerplate.js.org/docs/editor-configuration
- To test on Windows use virtual machine image from https://developer.microsoft.com/en-us/windows/downloads/virtual-machines/ (install VirtualBox 6 on Ubuntu following this guide: https://tecadmin.net/install-virtualbox-on-ubuntu-18-04/)

### Linting

We check for appropriate linting before each commit. You will be able to fix some lint errors automatically using `yarn lint-fix`.

### Running the app

- `yarn` installs dependencies.
- `yarn dev` runs the app in development mode (with developer tools, hot swapping, ...).
- `yarn start` runs the app in production mode (bundled and optimized).

Prepend `yarn cross-env DEBUG_PROD=true` to a command to enable debugging in production.
For example: `yarn cross-env DEBUG_PROD=true yarn package`.

### Packaging for production

`yarn package` packages the app for install. We run it with GitHub actions and store artifacts, so you can simply download an artifact from there.
Model packaging: go to `models/runner/` and follow the README there (both for Windows and Linux).

## License

AGPLv3

## Definition of Done:

- Change has been tested (manually or with automated tests). No existing functionality is broken.
- Continuous integration checks (linter, project build) pass.
- README is updated with all information related to the change.
- All code has been peer-reviewed before merging into any main branch.
- Change is tested in installed version on Windows and Linux.
