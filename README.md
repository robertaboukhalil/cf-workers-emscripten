# Template for C/C++ Cloudflare Workers

A minimal template for running C/C++ code on Cloudflare Workers using WebAssembly and Emscripten. This is a trimmed down version of [cloudflare/worker-emscripten-template](https://github.com/cloudflare/worker-emscripten-template).

## Usage

### 1. Compile to WebAssembly

```bash
# Using Emscripten 2.0.25
emcc -O2 pi.c -o pi.js \
  -s INVOKE_RUN=0 \
  -s EXPORTED_RUNTIME_METHODS=["callMain"] \
  -s ENVIRONMENT="web" \
  -s MODULARIZE=1
```

Notes:

* Make sure to use the Emscripten flags `-s ENVIRONMENT=web -s MODULARIZE=1`, as shown above.
* Note that the Emscripten flag `-s TEXTDECODER=0` is no longer needed as of February 25 2022, since Cloudflare Workers now [supports the TextDecoder API with UTF-16/UTF-32 encodings](https://community.cloudflare.com/t/2022-2-25-workers-runtime-release-notes/360450).

### 2. Bind .wasm files to variables

Next, define the WebAssembly modules and their bindings in `wrangler.toml`:

```toml
wasm_modules = { PI_WASM = "./pi.wasm" }
```

See `index.js` to see how this `PI_WASM` variable is used to initalize the WebAssembly module.

### 3. Deploy

```
wrangler publish
```
