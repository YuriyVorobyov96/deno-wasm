#include <emscripten.h>

/* 
 * EMSCRIPTEN_KEEPALIVE - a macro to expose function for using in JS/TS
 */

EMSCRIPTEN_KEEPALIVE
int add(int x, int y) {
  return x + y;
}

EMSCRIPTEN_KEEPALIVE
int subtract(int x, int y) {
  return x - y;
}