## Template for C/C++ Cloudflare Workers

A minimal template for running C/C++ code on Cloudflare Workers using WebAssembly and Emscripten. This is a trimmed down version of [cloudflare/worker-emscripten-template](https://github.com/cloudflare/worker-emscripten-template).

### Usage

* When compiling to WebAssembly, use the Emscripten flags `-s TEXTDECODER=0 -s ENVIRONMENT="web" -s MODULARIZE=1 --pre-js pre.js`
* Use `wrangler publish` to deploy
