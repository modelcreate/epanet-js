#!/bin/bash

set -e


echo "============================================="
echo "Compiling wasm bindings"
echo "============================================="
(
  #  /opt/epanet/build/lib/libepanet-output.a  \
  #    -I /opt/epanet/src/include \
  #  -I /opt/epanet/src/src/*.c \
  #     -I epanet2/*.c \
  # Compile C/C++ code
  emcc -O1 -o ./my-module.js  \
    /opt/epanet/build/lib/libepanet2.a \
    -I /opt/epanet/src/include \
    test.c \
    --bind \
    -s EXPORTED_FUNCTIONS="['_EN_geterror','_EN_getversion']" \
    -s STRICT=1 \
    -s ERROR_ON_UNDEFINED_SYMBOLS=0 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s ASSERTIONS=0 \
    -s MALLOC=emmalloc \
    -s MODULARIZE=1 \
    -s EXPORT_ES6=1 \
    -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "intArrayToString"]'
    
    

  # Create output folder
  mkdir -p dist
  # Move artifacts
  mv my-module.{js,wasm} dist
)
echo "============================================="
echo "Compiling wasm bindings done"
echo "============================================="