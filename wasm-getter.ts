import { readAll } from 'https://deno.land/std@0.141.0/streams/conversion.ts';

export class WebAssemblyGetter {
  private pathToWasmModule: string;
  private wasmInstancePromise: Promise<WebAssembly.Instance>;

  constructor (pathToWasmModule: string) {
    this.pathToWasmModule = pathToWasmModule;
    this.wasmInstancePromise = this.getWasmModuleByPath();
  }

  /**
   * We open the wasm module, read it into a buffer, create a WebAssembly.Module from the buffer, and
   * then create a WebAssembly.Instance from the module
   * @returns A promise of a WebAssembly.Instance object.
   */
  private async getWasmModuleByPath(): Promise<WebAssembly.Instance> | never {
    try {
      const wasm = await Deno.open(this.pathToWasmModule);
      const buffer = await readAll(wasm);
  
      const wasmModule = new WebAssembly.Module(buffer);
  
      return new WebAssembly.Instance(wasmModule);
    } catch (e) {
      throw new Error(`Cannot get ${this.pathToWasmModule} module | ${e}`); 
    }
  }

  /**
   * It returns a function from the WebAssembly module
   * @param {string} functionName - The name of the function you want to call from the wasm module.
   * @returns A function from wasm module.
   */
  public async getFunctionFromModule(functionName: string): Promise<CallableFunction> | never {
    try {
      const wasmInstance = await this.wasmInstancePromise;
      const wasmFunction = wasmInstance.exports[functionName];

      if (!wasmFunction) {
        throw new Error(`${functionName} does not exist in ${this.pathToWasmModule} module`);
      }
  
      return wasmFunction as CallableFunction;
    } catch (e) {
      throw new Error(`Cannot get function with provided name | ${e}`); 
    }
  }
}
