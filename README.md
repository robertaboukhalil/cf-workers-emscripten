## Template for C/C++ Cloudflare Workers

A minimal template for running C/C++ code on Cloudflare Workers using WebAssembly and Emscripten. This is a trimmed down version of [cloudflare/worker-emscripten-template](https://github.com/cloudflare/worker-emscripten-template).

### Usage

* When compiling to WebAssembly, make sure to use the Emscripten flags `-s TEXTDECODER=0 -s ENVIRONMENT="web" -s MODULARIZE=1`:

```
# Using Emscripten 2.0.25
emcc -O2 src/pi.c -o pi.js \
  -s INVOKE_RUN=0 \
  -s EXPORTED_RUNTIME_METHODS=["callMain"] \
  -s TEXTDECODER=0 \
  -s ENVIRONMENT="web" \
  -s MODULARIZE=1
```

* Use `wrangler publish` to deploy

### Todo

* Is `--pre-js pre.js` where pre.js contains `const document = this` needed?
