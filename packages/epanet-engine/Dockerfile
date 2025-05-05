FROM trzeci/emscripten:1.39.4

# Overwrite sources.list to point to the archive
RUN echo "deb http://archive.debian.org/debian/ stretch main" > /etc/apt/sources.list && \
    echo "deb http://archive.debian.org/debian-security/ stretch/updates main" >> /etc/apt/sources.list

# Now run update and install, clean up in the same layer
RUN apt-get update && \
    apt-get install -y --no-install-recommends git && \
    mkdir -p /opt/epanet/build && \
    git clone --depth 1 --branch v2.2 https://github.com/OpenWaterAnalytics/EPANET /opt/epanet/src && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt/epanet/build

RUN emcmake cmake ../src && \
    emmake cmake --build . --config Release