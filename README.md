# hivehome-webapp-favicons-webpack-plugin
Favicon Generator for Hivehome Webapp

## Usage
```
const HivehomeWebappFaviconsWebpackPlugin = require('hivehome-webapp-favicons-webpack-plugin');
...
{
  //... webpack config
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
}
```
