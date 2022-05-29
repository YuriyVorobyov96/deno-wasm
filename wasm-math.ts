import { readAll } from 'https://deno.land/std@0.141.0/streams/conversion.ts';

const wasm = await Deno.open("./math.wasm");
const buffer = await readAll(wasm);

const wasmModule = new WebAssembly.Module(buffer);
const wasmInstance = new WebAssembly.Instance(wasmModule);

const add = wasmInstance.exports.add as CallableFunction;
const subtract = wasmInstance.exports.subtract as CallableFunction;

console.log(add(1, 2));
console.log(subtract(2, 1));