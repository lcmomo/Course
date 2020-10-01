const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const PurifyCSSPlugin = require('purifycss-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
const argv=require("yargs-parser")(process.argv.slice(2));
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const _mode=argv.mode || "development";
const _modeflag = (_mode == "production" ? true : false);
const merge=require('webpack-merge');
const _mergeConfig=require(`./config/webpack.${_mode}.js`);

const HtmlWebpackPlugin = require('html-webpack-plugin');

//二、优化
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
// const setTitle = require('node-bash-title');
// setTitle('liuc的webpack🍎');
const {
  join
} = require("path");

const loading={
  html:"加载中..."
}
webpackConfig={
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader'
          }
        ],
      },
    ],
  },
  plugins: [
    new WebpackDeepScopeAnalysisPlugin(),
    // new MiniCssExtractPlugin({
    //   filename:  "[name].css",
    //   chunkFilename:  "[id].css" 
    // }),
    new MiniCssExtractPlugin({
      filename: _modeflag ? "styles/[name].[hash:5].css" : "styles/[name].css",
      chunkFilename: _modeflag ? "styles/[id].[hash:5].css" : "styles/[name].css"
    }),
    // new CleanWebpackPlugin(['dist']),
    // new PurifyCSSPlugin({
    //   paths: glob.sync(join(__dirname, './dist/*.html')),
    // })
    new HtmlWebpackPlugin({
      filename:"index.html",
      template:"src/index.html",
      loading
  }),

  new WebpackBuildNotifierPlugin({
    title: "李刘超Webpack",
    // logo: path.resolve("./img/favicon.png"),
    suppressSuccess: true
}),
new ProgressBarPlugin(),
new DashboardPlugin(),
  ]
}

//module.exports = smp.wrap(merge(_mergeConfig,webpackConfig));
module.exports =merge(_mergeConfig,webpackConfig);