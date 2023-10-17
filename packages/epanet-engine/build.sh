#!/bin/bash

set -e

# Useful debug flags for emcc
#    -s ASSERTIONS=1 \
#    -s SAFE_HEAP=1 \
#    -s STACK_OVERFLOW_CHECK=1 \
#    -s DEMANGLE_SUPPORT=1 \
# -fsanitize=address

echo "============================================="
echo "Compiling wasm bindings"
echo "============================================="
(

  mkdir -p build

  # Compile C/C++ code
  emcc -O3 -o ./build/epanetEngine.js /opt/epanet/build/lib/libepanet2.a \
    -I /opt/epanet/src/include \
    test.c \
    -s EXPORTED_FUNCTIONS="['_EN_geterror','_EN_getversion']" \
    -s NO_EXIT_RUNTIME="1" \
	    -s DEAD_FUNCTIONS="[]" \
	    -s FORCE_FILESYSTEM="1" \
		-s ALLOW_MEMORY_GROWTH="1" \
    -s ERROR_ON_UNDEFINED_SYMBOLS=0 \
    -s 'EXPORTED_FUNCTIONS=["_free"]' \
	  -s EXPORTED_RUNTIME_METHODS='["ccall", "getValue", "UTF8ToString", "stringToUTF8", "_free", "intArrayToString","FS"]' \
		-s WASM=1 \
		-s SINGLE_FILE=1 \
    -msimd128 \
    -s WASM_ASYNC_COMPILATION=0 \
		--memory-init-file 0 \
    --closure 0
    #-s MODULARIZE=1 \

    #src/epanet_wrapper.cpp \
    #--bind \

    # -msimd128 Enable SIMD  https://jott.live/markdown/wasm_vector_addition

		#-s BINARYEN_ASYNC_COMPILATION=0 \
    #-s MODULARIZE=1 \

		cat src/wrapper/cjs-prefix.js build/epanetEngine.js src/wrapper/cjs-postfix.js >> index.js
		cat build/epanetEngine.js src/wrapper/es6-postfix.js >> index.es6.js


  # Create output folder
  mkdir -p dist
  # Move artifacts
  mv index.js dist
  mv index.es6.js dist

)
echo "============================================="
echo "Compiling wasm bindings done"
echo "============================================="