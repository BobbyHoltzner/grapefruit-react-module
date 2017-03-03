var path = require("path");
var webpack = require("webpack");

var config = {
  /*
   * app.ts represents the entry point to your web application. Webpack will
   * recursively go through every "require" statement in app.ts and
   * efficiently build out the application's dependency tree.
   */
  entry: ["babel-polyfill","./src/App"],

  /*
   * The combination of path and filename tells Webpack what name to give to
   * the final bundled JavaScript file and where to store this file.
   */
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build/')
  },

  plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],

  /*
   * resolve lets Webpack now in advance what file extensions you plan on
   * "require"ing into the web application, and allows you to drop them
   * in your code.
   */
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
 
  performance: { hints: false },
  // node: {
  //   fs: "empty"
  // },
  module: {
    /*
     * Each loader needs an associated Regex test that goes through each
     * of the files you've included (or in this case, all files but the
     * ones in the excluded directories) and finds all files that pass
     * the test. Then it will apply the loader to that file. I haven't
     * installed ts-loader yet, but will do that shortly.
     */
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader!ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};

module.exports = config;