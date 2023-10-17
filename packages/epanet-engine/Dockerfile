FROM emscripten/emsdk:3.1.15

RUN apt-get update && \
    apt-get install -qqy git && \
    mkdir -p /opt/epanet/build && \
    git clone --depth 1 --branch v2.2 https://github.com/OpenWaterAnalytics/EPANET /opt/epanet/src
RUN cd /opt/epanet/build && \
    emcmake cmake ../src  && \
    emmake cmake --build . --config Release
