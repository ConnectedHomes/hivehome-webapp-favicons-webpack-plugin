
# hivehome-webapp-favicons-webpack-plugin

Connect Home Favicon Generator Plugin for Webpack
Generates favicons, app-touch icons and descriptor/manifest files for IOS, Android, Windows and Generic favicons.


[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![npm version](https://badge.fury.io/js/%40connected-home%2Fhivehome-webapp-favicons-webpack-plugin.svg)](https://badge.fury.io/js/%40connected-home%2Fhivehome-webapp-favicons-webpack-plugin)
[![Dependency Status](https://david-dm.org/ConnectedHomes/hivehome-webapp-favicons-webpack-plugin.svg)](https://david-dm.org/ConnectedHomes/hivehome-webapp-favicons-webpack-plugin)
[![devDependency Status](https://david-dm.org/ConnectedHomes/hivehome-webapp-favicons-webpack-plugin/dev-status.svg)](https://david-dm.org/ConnectedHomes/hivehome-webapp-favicons-webpack-plugin#info=devDependencies)

## Supported Platforms:

### Generic
Standard format favicons
  - favicon.ico (16x16, 24x24, 32x32, 48x48& 64x64)
  - favicon-16x16.png
  - favicon-24x24.png
  - favicon-32x32.png
  - favicon-48x48.png
  - favicon-64x64.png

### iPhone
IOS Format `app-touch-icons`
  - apple-touch-icon-57x57.png
  - apple-touch-icon-60x60.png
  - apple-touch-icon-72x72.png
  - apple-touch-icon-76x76.png
  - apple-touch-icon-114x114.png
  - apple-touch-icon-120x120.png
  - apple-touch-icon-144x144.png
  - apple-touch-icon-152x152.png
  - apple-touch-icon-180x180.png

### Android
Android format `manifest.json` and icons
 - manifest.json
 - android-chrome-36x36.png
 - android-chrome-46x46.png
 - android-chrome-72x72.png
 - android-chrome-96x96.png
 - android-chrome-144x144.png
 - android-chrome-192x192.png
 - android-chrome-256x256.png
 - android-chrome-384x384.png
 - android-chrome-512x512.png

### Windows
Windows format `browserconfig.xml` and icons
 - mstile-128x128.png (70x70)
 - mstile-144x144.png
 - mstile-270x270.png (150x150)
 - mstile-558x270.png (310x150)
 - mstile-558x558.png (310x310)

Notes:
 1. For each `ms-tile-...` file - the actual file size does not reflect the 'size' it is supposed to represent (except for the 144x144 which just is what it is)... cause... Microsoft!
 2. Because the widescreen format tile (mstile-558x270.png) it is at odds with the proportions of a square source image. In this case the conversion will 'letterbox' the image using either a transparent background or if supplied using the `tileColor` config option as the background color.

## Usage
```javascript

const HivehomeWebappFaviconsWebpackPlugin = require('@connected-home/hivehome-webapp-favicons-webpack-plugin');

const config = {
  /* ...webpack config here... */
  plugins: [
    new HivehomeWebappFaviconsWebpackPlugin({
      title: 'Hive Home',
      prefix: 'assets/[hash]-',
      platforms: {
          generic: {
              source: path.join(__dirname, '../lib/assets/icons', 'favicon.png')
          },
          iphone: {
              source: path.join(__dirname, '../lib/assets/icons', 'app-icon.png'),
              statusBar: 'black-translucent'
          },
          android: {
              source: path.join(__dirname, '../lib/assets/icons', 'app-icon.png'),
              themeColor: '#ec6e05',
              backgroundColor: '#ffffff'
          },
          windows: {
              source: path.join(__dirname, '../lib/assets/icons', 'app-icon.png'),
              tileColor: '#ec6e05'
          }
      }
    })
  ]
};
```

## License

This project is licensed under MIT.
