# PWA workshop

https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0

manifest - https://developers.google.com/web/fundamentals/web-app-manifest/

service worker - https://developers.google.com/web/fundamentals/primers/service-workers/

We're going to make it easy using webpack and workbox

## steps

### Install & Configure the workbox webpack plugin

`yarn add --dev workbox-webpack-plugin`

```js
// client/webpack.config.js

// require the plugin
const {GenerateSW} = require('workbox-webpack-plugin')

// add the plugin to the list of webpack plugins
new GenerateSW({
  clientsClaim: true,
  skipWaiting: true,
}),
```

### Install & Configure the webpack pwa manifest plugin

`yarn add --dev webpack-pwa-manifest`

```js
// client/webpack.config.js

// require the plugin
const WebpackPwaManifest = require('webpack-pwa-manifest')

// generate a manifest json (https://github.com/arthurbergmz/webpack-pwa-manifest)
const manifest = {
  name: 'Countdown',
  short_name: 'MyCountdown',
  description: 'My awesome Countdown Progressive Web App!',
  background_color: '#ffffff',
  crossorigin: 'use-credentials',
  icons: [
    {
      src: path.resolve('assets/joe.png'),
      sizes: [96, 128, 192, 256, 384, 512]
    },
    {
      src: path.resolve('assets/large-joe.png'),
      size: '1024x1024'
    }
  ]
}

// add the plugin to the list of webpack plugins
new WebpackPwaManifest(manifest),
```

### register the service worker

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
```

https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin

## intro

desktop - https://developers.google.com/web/progressive-web-apps/desktop
