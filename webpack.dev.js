/*-------------------------*/
/*---- CHILLI+GARLIC ------*/
/*-   Webpack dev config  -*/
/*-------------------------*/

const path = require('path'); // include the node.js path package

// Merge in the common webpack config using webpack-merge
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
    output: {
        // path.resolve joins the current absolute path (__dirname) to where we want our bundle to go (dist/js).
        // __dirname is provided by node and refers to the current working folder
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    devServer: {
        contentBase: './src',
        open: 'Google Chrome'
    },
    module: {
        rules: [
            {
                // Handle our Scss/Sass using three packages - save time for dev, no separate css file produced
                test: /\.scss$/,
                use: [
                    // Runs backwards
                    'style-loader', // 3. Injects our styles into the DOM
                    'css-loader', // 2. Turns the css into javascript
                    'sass-loader' // 1. Turns scss into standard css
                ]
            }
        ]
    }
});