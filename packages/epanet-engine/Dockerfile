#FROM trzeci/emscripten:1.39.4
FROM emscripten/emsdk:3.1.15

RUN apt-get update && \
    apt-get install -qqy git && \
    mkdir -p /opt/epanet/build && \
    git clone --depth 1 --branch v2.2 https://github.com/OpenWaterAnalytics/EPANET /opt/epanet/src
COPY src/unofficial /tmp/unofficial
RUN cp -R /tmp/unofficial/src/* /opt/epanet/src/src 
RUN cp -R /tmp/unofficial/include/extension.h /opt/epanet/src/include/extension.h
RUN cd /opt/epanet/build && \
    emcmake cmake ../src  && \
    emmake cmake --build . --config Release
