const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //here is where we add webpack to generate our html file
      new HtmlWebpackPlugin ({
        template: './index.html',
        title: 'JATE'
      }),
      // this will inject our service worker
      new InjectManifest ({
        swSrc: './src-sw.js',
        seDest: 'src-sw.js',
      }),
      // here we create the manifest.json file
      new WebpackPwaManifest ({
        fingerprints: false,
        inject: true,
        name: 'Here is yet ANOTHER text editor YAY',
        short_name: 'JATE',
        description: 'Here is yet ANOTHER text editor YAY',
        background_color: '225ca3',
        theme_color: '225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [{
            src: path.resolve ('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.json ('assets', 'icons'),
      },
    ], 
      }),
    ],

    module: {
        //here will be our css loaders

      rules: [{
test: /\.css$/i,
use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset.env'],
                plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
        },
      },
      ],
    },
  };
};