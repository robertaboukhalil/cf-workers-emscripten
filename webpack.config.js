const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./index.js",
	target: "webworker",
	plugins: [
		new CopyPlugin([
			{ from: "./pi.wasm", to: "./worker/module.wasm" }  // must be module.wasm
		]),
	]
}
