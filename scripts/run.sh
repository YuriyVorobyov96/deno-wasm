#!/bin/bash

BUILD_SCRIPT="scripts/build_wasm.sh"

. "$BUILD_SCRIPT" && deno run --allow-read index.ts