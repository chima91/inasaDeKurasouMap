// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "production";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
    entry: {
        index: "./src/index.js",
        map: "./src/map.js",
        detail: "./src/detail.js",
        list: "./src/list.js"
    },
    output: {
        path: `${__dirname}/dist`,
        filename: "[name].bundle.js"
    },
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: MODE,

    module: {
        rules: [
            {
                // 拡張子 .js の場合
                test: /\.js$/,
                use: [
                    {
                        // Babel を利用する
                        loader: "babel-loader",
                        options: {
                            presets: [
                                // プリセットを指定することで、ES2020 を ES5 に変換
                                "@babel/preset-env"
                            ],
                        },
                    },
                ],
            },
            {
                // 対象となるファイルの拡張子
                test: /\.css/,
                // ローダー名
                use: [
                    // linkタグに出力する機能
                    "style-loader",
                    // CSSをバンドルするための機能
                    {
                        loader: "css-loader",
                        options: {
                        // オプションでCSS内のurl()メソッドの取り込みを禁止する
                        url: false,
                        // ソースマップを有効にする
                        sourceMap: enabledSourceMap
                        }
                    }
                ]
            },
        ],
    },
    // ES5(IE11等)向けの指定
    target: ["web", "es5"],

    // ローカル開発用環境を立ち上げる
    // 実行時にブラウザが自動的に localhost を開く
    devServer: {
        contentBase: outputPath,
        open: true
    }
};