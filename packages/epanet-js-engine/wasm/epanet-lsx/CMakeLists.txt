cmake_minimum_required(VERSION 3.13)
project(epanetlsx LANGUAGES C)

set(LSX_DIR "${CMAKE_SOURCE_DIR}/build/EPANET-LSX")
set(LSX_SRC_DIR "${LSX_DIR}/src")
set(EPANET_DIR "${CMAKE_SOURCE_DIR}/build/EPANET")

file(GLOB LSX_SOURCES "${LSX_SRC_DIR}/*.c")

add_library(epanetlsx STATIC ${LSX_SOURCES})

target_include_directories(epanetlsx PUBLIC
    ${LSX_DIR}/include
    ${LSX_SRC_DIR}
    ${LSX_DIR}/vendor
    ${EPANET_DIR}/include
    ${EPANET_DIR}/src
    ${EPANET_DIR}/src/util
)

if(NOT CMAKE_BUILD_TYPE STREQUAL "Debug")
    target_compile_options(epanetlsx PRIVATE -O2 -flto)
else()
    target_compile_options(epanetlsx PRIVATE -O0)
endif()
