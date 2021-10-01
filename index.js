import Module from "./pi.js";

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

		// Instead of downloading the .wasm file, fetch it from a global var
		instantiateWasm: (imports, callback) => {
			// Note that "PI_WASM" is defined in wrangler.toml
			const instance = new WebAssembly.Instance(PI_WASM, imports);
			callback(instance);
			return instance.exports;
		}
	});

	// Parse user parameter
	const position = new URL(request.url).searchParams.get("n") || 0;

	// Call main function where first argument = nth digit of PI to calculate
	m.callMain([ position ]);

	return new Response(output);
}
