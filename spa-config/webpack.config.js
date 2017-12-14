// 单页应用
var path = require("path");
const pages = [{
    entry: {
        app: ["../app/main.js"]
    },
    output: {
        path: path.resolve(__dirname, "../build"),
        publicPath: "/assets/",
        filename: "bundle.js"
    }
}, {
    entry: {
        app: ["../app/pages/detail/main.js"]
    },
    output: {
        path: path.resolve(__dirname, "../build"),
        publicPath: "/assets/",
        filename: "bundle.js"
    }
}];

const webpackConfig = {
    entry: pages[1].entry,
    output: pages[1].output,
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    }
};

module.exports = webpackConfig;