import { WebAssemblyGetter } from './wasm-getter.ts';

const wasmMathModule = new WebAssemblyGetter('math.wasm');

const add = await wasmMathModule.getFunctionFromModule('add');
const subtract = await wasmMathModule.getFunctionFromModule('subtract');

console.log(add(1, 2));
console.log(subtract(2, 1));
