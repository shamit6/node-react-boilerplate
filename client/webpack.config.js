const webpack = require('webpack')
const path = require('path')
const {GenerateSW} = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development')
const manifest = {
  name: 'Countdown',
  short_name: 'MyCountdown',
  description: 'My awesome Countdown Progressive Web App!',
  background_color: '#ffffff',
  crossorigin: 'use-credentials',
  icons: [
    {
      src: path.resolve(__dirname, 'client/assets/joe.png'),
      sizes: [96, 128, 192, 256, 384, 512],
    },
    {
      src: path.resolve(__dirname, 'client/assets/joe.png'),
      size: '1024x1024',
    },
  ],
}

let publicPath
let devtool
let hotloaderEntries = []
let plugins = [
  new webpack.DefinePlugin({
    'process.env': {NODE_ENV},
  }),
  new GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
  }),
  new WebpackPwaManifest(manifest),
]

if (NODE_ENV === '"development"') {
  publicPath = 'http://localhost:3000/'
  plugins.push(new webpack.NamedModulesPlugin())
  plugins.push(new webpack.HotModuleReplacementPlugin())
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  )
  devtool = 'eval-source-map'
  hotloaderEntries = [`webpack-hot-middleware/client?path=${publicPath}__webpack_hmr&name=desktop`]
} else {
  // TODO set publicPath
  // publicPath='http://localhost:3000/'
  plugins.push(new webpack.optimize.AggressiveMergingPlugin())
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  )
}

const config = {
  target: 'web',
  mode: NODE_ENV === '"development"' ? 'development' : 'production',
  context: path.resolve(__dirname, './client'),
  entry: {
    bundle: [...hotloaderEntries, './index.js'],
    html: './index.html',
    vendor: [...hotloaderEntries, 'react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, './static'),
    publicPath,
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'client'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'client'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory=true'],
      },
      {
        test: /\.svg(\?.*)?$/,
        include: path.resolve(__dirname, 'client', 'assets'),
        loader: 'url-loader',
        options: {
          limit: '1024h',
          context: 'images',
          outputPath: 'images',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          mimetype: 'image/png',
          context: 'images',
          outputPath: 'images',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.gif$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          mimetype: 'image/gif',
          context: 'images',
          outputPath: 'images',
          name: '[name].[ext]',
        },
        include: path.resolve(__dirname, 'client', 'assets'),
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          mimetype: 'image/jpg',
          context: 'images',
          outputPath: 'images',
          name: '[name].[ext]',
        },
        include: path.resolve(__dirname, 'client', 'assets'),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        exclude: path.resolve(__dirname, 'client', 'assets'),
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins,
  devtool,
  devServer: {
    contentBase: './client',
    hot: true,
    // publicPath: '/',
    publicPath,
  },
}

module.exports = config
