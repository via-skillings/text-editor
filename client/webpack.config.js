// Required webpack plugins and modules
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest} = require('workbox-webpack-plugin');

module.exports = () => {
  return {
      // Set webpack mode to development
    mode: 'development',
      // Entry points for the application bundles
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
      // Output configuration for bundled files
    output: {
      filename: '[name].bundle.js', // Output filename based on entry point names
      path: path.resolve(__dirname, 'dist'), // Output directory path
    },
      // Plugins used by webpack
    plugins: [
        // Generate HTML files with injected bundles
      new HtmlWebpackPlugin({
        template: './index.html', // HTML template file
        title: 'Webpackplugin' // Title for the generated HTML
      }),
        // Injects a service worker into the webpack build
      new InjectManifest({
        swSrc: './src-sw.js', // Service worker source file
        swDest: 'src-sw.js', // Destination file for the injected service worker
        compileSrc: true, // Compile the source service worker file
        mode: 'production', // Service worker mode
      }),
        // Extracts CSS into separate files
      new MiniCssExtractPlugin(),
        // Generates a Web App Manifest for PWA features
      new WebpackPwaManifest({
        name: 'JATE Text Editor', // Application name
        short_name: 'JATE', // Short name for the application
        description: 'A basic text editor app', // Description of the application
        background_color: '#7eb4e2', // Background color of the application
        theme_color: '#7eb4e2', // Theme color used for the application
        start_url: './', // URL to start the application
        publicPath: './', // Public path for the manifest file
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to the application icon
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('src', 'icons'), // Destination directory for icons
          },   
        ],
      }),
    ],
      // Module rules for processing different file types
    module: {
      rules: [
        {
          test: /\.css$/i, // CSS file matching pattern
          use: [MiniCssExtractPlugin.loader, 'css-loader'], // Use MiniCssExtractPlugin and css-loader
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i, // Image file matching pattern
          type: 'asset/resource', // Use asset/resource to handle images
        },
        {
          test: /\.m?js$/, // JavaScript file matching pattern
          exclude:/node_modules/, // Exclude node_modules directory
          use: {
            loader: "babel-loader", // Use babel-loader for JavaScript files
            options: {
              presets: ['@babel/preset-env'] // Babel preset options
            }
          },
        }
      ],
    },
  };
};