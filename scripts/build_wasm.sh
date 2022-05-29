#!/bin/bash

ERROR_COLOR='\033[0;31m'
WARNING_COLOR='\033[33m'
DEFAULT_ENV_COLOR='\033[36m'
NO_COLOR='\033[0m'

DEFAULT_EMSDK_COMPILER_PATH='/Applications/emsdk/upstream/emscripten/emcc'

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)

  if [[ ! $EMSDK_COMPILER ]]; then
    echo "${WARNING_COLOR}Set default value ${DEFAULT_ENV_COLOR}($DEFAULT_EMSDK_COMPILER_PATH)${WARNING_COLOR} because EMSDK_COMPILER environment is undefined${NO_COLOR}"
    EMSDK_COMPILER_PATH=$DEFAULT_EMSDK_COMPILER_PATH
  else
    EMSDK_COMPILER_PATH="${EMSDK_COMPILER}"
  fi

  $EMSDK_COMPILER_PATH math.c -O3 --no-entry -o math.wasm
else
  echo "${ERROR_COLOR}Provide .env file with path to emsdk${NO_COLOR}"
  exit
fi

