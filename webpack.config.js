const MODE = "production"; // webpack の出力オプション（'production' か 'development'）を指定：モード値を production に設定すると最適化された状態で、development に設定するとソースマップ有効でJSファイルが出力される
const enabledSourceMap = MODE === "development"; // ソースマップの利用有無(modeがproductionのときはソースマップを利用しない)

const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  entry: {
    index: "./src/js/index.js",
    map: "./src/js/map.js",
    detail: "./src/js/detail.js",
    list: "./src/js/list.js"
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].bundle.js",
    // assetModuleFilename: 'src/img/[name][ext]'
  },
  optimization: {
    splitChunks: {
      name: "commonlib",
      chunks: "initial"
    }
  },
  mode: MODE,

  module: {
    rules: [
      {
        test: /\.ejs$/,
        exclude: /node_modules/,
        use: [
          "html-loader",
          "ejs-plain-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env"
              ],
            },
          },
        ],
      },
      // {
      //   test: /\.(png|gif)$/,
      //   type: 'asset/resource'
      // },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",  // linkタグに出力するためのローダー
          {  // CSSをバンドルするためのローダー
            loader: "css-loader",
            options: {
              url: false, // オプションでCSS内のurl()メソッドの取り込みを禁止する
              sourceMap: enabledSourceMap,
              importLoaders: 2 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            }
          },
          {  // SassをCSSにコンパイルするためのローダー
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap
            },
          },
        ],
      },
    ],
  },

  plugins: [
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template:  './src/ejs/index.ejs',
          chunks: ['index']
      }),
      new HtmlWebpackPlugin({
          filename: 'map.html',
          template:  './src/ejs/map.ejs',
          chunks: ['map']
      }),
      new HtmlWebpackPlugin({
          filename: 'detail.html',
          template:  './src/ejs/detail.ejs',
          chunks: ['detail']
      }),
      new HtmlWebpackPlugin({
          filename: 'list.html',
          template:  './src/ejs/list.ejs',
          chunks: ['list']
      }),
  ],

  // target: ["web", "es5"], // ES5(IE11等)向けの指定
  devServer: {
    contentBase: outputPath,
    open: true  // サーバー起動時にブラウザも開きなさいという意味。実行時にブラウザが自動的に localhost を開く。
  },
  devtool: 'eval-source-map' // ソースマップの品質を指定（デフォルトはeval）
});