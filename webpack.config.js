module.exports = {
    entry: "./src/index.js",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.css/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
}
