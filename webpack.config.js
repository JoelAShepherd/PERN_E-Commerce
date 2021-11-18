const HtmlWebPackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    "mode": "development",
    "entry": "./Client/index.js",
    "output": {
        "path": __dirname + '/dir',
        "filename": "bundle.js"
    },
    "devtool": "source-map",
    "module": {
        "rules": [
            {
                "enforce": "pre",
                "test": /\.js$/,
                "exclude": /node_modules/,
                "loader": "eslint-webpack-plugin",
                "options": {
                  "emitWarning": true,
                  "failOnError": false,
                  "failOnWarning": false,
                  "target": "ES6"
                }
            },
            {
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader"
                }
            },
            {
                "test": /\.css$/,
                "use": [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                "test": /\.html$/,
                "use": [
                    {
                        "loader": "html-loader"
                    }
                ]
            },
            {
                "test": /\.(png|jpe?g|gif)$/i,
                "use": [
                  {
                    "loader": 'file-loader'
                  },
                ],
              }
        ]
    },
    "plugins": [ new ESLintPlugin(), 
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        
    ]
}

