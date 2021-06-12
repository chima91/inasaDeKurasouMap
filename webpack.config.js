const MODE = "production"; // webpack の出力オプション（'production' か 'development'）を指定：モード値を production に設定すると最適化された状態で、development に設定するとソースマップ有効でJSファイルが出力される
const enabledSourceMap = MODE === "development"; // ソースマップの利用有無(modeがproductionのときはソースマップを利用しない)

const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');

// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: "./src/js/index.js",
        map: "./src/js/map.js",
        detail: "./src/js/detail.js",
        list: "./src/js/list.js"
    },
    output: {
        path: `${__dirname}/dist`,
        filename: "[name].bundle.js"
    },
    // optimization: {
    //     splitChunks: {
    //         name: "commonlib",
    //         chunks: "initial"
    //     }
    // },
    mode: MODE,

    module: {
        rules: [
            {
                test: /\.js$/, // 対象となるファイルの拡張子
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env" // プリセットを指定することで、ES2020 を ES5 に変換
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/, // 対象となるファイルの拡張子
                use: [
                    "style-loader",  // linkタグに出力するためのローダー
                    {  // CSSをバンドルするためのローダー
                        loader: "css-loader",
                        options: {
                            url: false, // オプションでCSS内のurl()メソッドの取り込みを禁止する
                            sourceMap: enabledSourceMap, // ソースマップの利用有無
                            importLoaders: 2 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                        }
                    },
                    {  // SassをCSSにコンパイルするためのローダー
                        loader: "sass-loader",
                        options: {
                            sourceMap: enabledSourceMap // ソースマップの利用有無
                        },
                    },
                ],
            },
        ],
    },

    target: ["web", "es5"], // ES5(IE11等)向けの指定
    devServer: { // ローカル開発用環境を立ち上げる
        contentBase: outputPath,
        open: true  // サーバー起動時にブラウザも開きなさいという意味。実行時にブラウザが自動的に localhost を開く。
    },
    devtool: 'eval-source-map' // ソースマップの品質を指定（デフォルトはeval）
};

// const ejsCompile = {
//     entry: "./src/ejs/index.ejs",
//     output: {
//         path: `${__dirname}/dist`,
//         filename: "[name].html"
//     },
//     // mode: MODE,

//     module: {
//         rules: [
//         // {
//         //     test: /\.(jpe?g|png|gif|svg)$/,
//         //     use: {
//             //     loader: 'file-loader',
//             //     options: {
//             //         name: '../img/[name].[ext]',
//             //     }
//         //     }
//         // },
//             {
//                 test: /\.ejs$/,
//                 use: [
//                     'html-loader',
//                     'ejs-plain-loader'
//                 ]
//             },
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template : 'src/ejs/index.ejs',
//         })
//     ]
// }