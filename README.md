# hcGUI

[![ISC License](http://img.shields.io/badge/license-ISC-blue.svg)](http://copyfree.org)

hcGUI is a cross-platform GUI for HC written in node.js using
Electron.

## Installation

Currently hcGUI is available on Windows, Linux, and macOS.

hcGUI will NOT use or in any way disrupt the wallet file you may
already be using at this time.

On macOS, Ubuntu (14.04 and later), and recent Debians, there should be
no additional dependencies needed.

On Fedora or similar distros you may need to install the libXScrnSaver
package if you see this error:
```
error while loading shared libraries: libXss.so.1
```

You can install this on a recent Fedora with the command:

```bash
sudo dnf -y install libXScrnSaver
```

On linux you will need to decompress the package:
```bash
tar -xvzf hcGUI-X.X.X.tar.gz
```
and then run the file:
```bash
./hcGUI
```

This will start hcd and hcwallet for you.

On macOS, double-click the .dmg file, drag the .app to your
Applications folder.  Double click on hcGUI.app to start.

From there follow the on screen instructions to setup your wallet.

### Options

When running a release version, there are a few options available.

To see additional debug information (including the output of hcd and hcwallet) run:

```
hcGUI --debug
```

To pass additional arguments to hcwallet (such as to increase the logging level run:

```
hcGUI --extrawalletargs='-d=debug'
```

## Developing

Due to potential compatibility issues, for now, all work should be
done with electron 1.8.2

You need to install hcd, hcwallet and hcctl.  

- [hcd/cmd/hcctl installation instructions](https://github.com/HcashOrg/hcd#updating)
- [hcwallet installation instructions](https://github.com/HcashOrg/hcwallet#installation-and-updating)

This has been tested on Linux and OSX.

Adjust the following steps for the paths you want to use.

``` bash
mkdir code
cd code
git clone https://github.com/HcashOrg/hcGUI.git
cd hcGUI
yarn
mkdir bin/
cp $GOPATH/bin/hc* bin/
yarn dev
```

### Note about developing with testnet

The first time you run with testnet, you may get a "Failed to connect wallet by deadline error".  If so, make sure you change your config.json:
```bash
"network": "testnet",
```

### Windows

On windows you will need some extra steps to build grpc.  This assumes
you are using msys2 with various development tools (copilers, make,
ect) all installed.

Install node from the official package https://nodejs.org/en/download/
and add it to your msys2 path.  You must install the same version of node as required for Linux and OSX (6.9.5).

Install openssl from the following site:
https://slproweb.com/products/Win32OpenSSL.html

From an admin shell:

```bash
npm install --global --production windows-build-tools
```

Then build grpc as described above.

## Building the package

You need to install hcd, hcwallet and hcctl.  

- [hcd/cmd/hcctl installation instructions](https://github.com/HcashOrg/hcd#updating)
- [hcwallet installation instructions](https://github.com/HcashOrg/hcwallet#installation-and-updating)

To build a packaged version of hcGUI (including a dmg on OSX and
exe on Windows), follow the development steps above.  Then build the
hc command line tools:

```bash
cd code/hcGUI
mkdir bin
cp `which hcd` bin/
cp `which hcctl` bin/
cp `which hcwallet` bin/
npm install
npm run package
```

## Building release versions

### Linux

You need to make sure you have the following packages installed for the building to work:
- icns2png
- graphicsmagick
- rpm-build

```bash
npm run package-linux
```

After it is finished it will have the built rpm, deb and tar.gz in the releases/ directory.

## Docker

A docker file for building hcGUI is also provided.  With no options it builds for linux on amd64 although it is possible to attempt OSX or arm builds (neither of which have been tested).

```
$ ./build-docker.sh <OS> <ARCH>
```

## Contact

If you have any further questions you can find us at:

- h.cash

## Issue Tracker

The
[integrated github issue tracker](https://github.com/HcashOrg/hcGUI/issues)
is used for this project.

## License

HcGui is licensed under the [copyfree](http://copyfree.org) ISC License.
