/*-------------------------*/
/*---- CHILLI+GARLIC ------*/
/*- WPk production config -*/
/*-------------------------*/

const path = require('path'); // include the node.js path package

// Merge in the common webpack config using webpack-merge
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

// Extract CSS to separate file for production builds
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  output: {
    // path.resolve joins the current absolute path (__dirname) to where we want our bundle to go (dist/js).
    // __dirname is provided by node and refers to the current working folder
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contentHash].bundle.js', // Add a content hash to the js output to enable cache busting
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contentHash].css',
    }),
  ],
  module: {
    rules: [
      {
        // Handle our Scss/Sass using three packages
        test: /\.scss$/,
        use: [
          // Runs backwards
          {
            loader: MiniCssExtractPlugin.loader, // 3. For production, pull css into separate file
            options: {
              publicPath: '../',
            },
          },
          'css-loader', // 2. Turns the css into javascript
          'sass-loader', // 1. Turns scss into standard css. Automatically minifies CSS for production builds
        ],
      },
    ],
  },
});
