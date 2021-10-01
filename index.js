import Module from "./wgsim.cloudflare.js";

addEventListener("fetch", event => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	// Initialize WebAssembly module
	let output = "";
	const m = await Module({
		// By default, stdout/stderr is output to console.log/warn
		print: text => output += `${text}\n`,
		printErr: text => output += `${text}\n`,

		// Instead of downloading the .wasm file, fetch it from the global var "WASM_MODULE".
		// Docs: <https://emscripten.org/docs/api_reference/module.html#Module.instantiateWasm>
		instantiateWasm: (imports, callback) => {
			// Note that "WASM_MODULE" is a variable that contains the .wasm file
			// and is created at deploy time by "wrangler publish".
			const instance = new WebAssembly.Instance(WASM_MODULE, imports);
			callback(instance);
			return instance.exports;
		}
	});

	// Call main function
	m.callMain([]);

	return new Response(output, { headers: { "Content-Type": "text/plain" } });
}
