// To build for release: NODE_ENV=production npm run build
const webpack = require('webpack');
const path    = require('path');
const plugins = [];
const env     = process.env.NODE_ENV;

var suffix = '.js',
  devtool = 'inline-source-map';

if (env === 'production') {
  devtool = undefined;
  suffix = '.min.js';
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['JsonReactor', 'exports', 'require']
    }
  }));
}

module.exports = {
  devtool: devtool,
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'json-reactor' + suffix,
    library: 'JsonReactor',
    umdNamedDefine: true,
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      // { test: /\.css$/, exclude: /\.useable\.css$/, loader: 'style!css' },
      // { test: /\.useable\.css$/, loader: 'style/useable!css' },
      {
          test: /\.scss$/,
          loaders: [
              'style-loader?insertAt=top',
              'css-loader?modules&importLoaders=1&localIdentName=rst__[local]',
              'postcss-loader',
              'sass-loader',
          ],
          include: path.join(__dirname, 'src')
      },
      {
          test: /\.css$/,
          loaders: [
              'style-loader?insertAt=top',
              'css-loader',
              'postcss-loader',
          ],
      },
      {
          test: /\.(jpe?g|png|gif|ico|svg)$/,
          loaders: [
              'file-loader?name=static/[name].[ext]',
          ],
          include: path.join(__dirname, 'src')
      },
      { test: require.resolve("./index.js"), loader: "expose?JsonReactor" },
      { test: /\.less$/, loader: 'css!less' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: plugins
};
