/*-------------------------*/
/*---- CHILLI+GARLIC ------*/
/*- Webpack common config -*/
/*-------------------------*/

// The plugin will generate an HTML5 file for us that includes all our webpack bundles in the body using script tags.
const HtmlWebpackPlugin = require('html-webpack-plugin');

// clean-webpack-plugin clears the dist dir before each new build
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/index.js',
    header: './src/js/components/header.js',
  },
  // NODE_ENV is provided to us by cross-env package.
  mode: process.env.NODE_ENV,
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'searchResults.html',
      template: './src/searchResults.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'recipe.html',
      template: './src/recipe.html',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        // Handle our HTML using HTML loader
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        // Handle all image types using file loader
        // Copies image to dist folder
        test: /\.(svg|jpg|jpeg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]', // Specify output format, including hash for cache busting
            outputPath: 'img', // Specify directory for images
          },
        },
      },
    ],
  },
};
