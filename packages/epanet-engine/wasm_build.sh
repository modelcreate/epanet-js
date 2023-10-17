#!/bin/bash

set -e



echo "============================================="
echo "Compiling wasm "
echo "============================================="
(

    mkdir -p build

    emcc epanet_version.c -o epanet_version.js \
    -I /opt/epanet/src/include \
    /opt/epanet/build/lib/libepanet2.a \
    -s WASM=1 -s "EXPORTED_FUNCTIONS=['_getversion']"

    mkdir -p dist
    mv epanet_version.js dist
    mv epanet_version.wasm dist

)
echo "============================================="
echo "Compiling wasm bindings done"
echo "============================================="