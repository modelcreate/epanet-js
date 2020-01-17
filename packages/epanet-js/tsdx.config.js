
// TSDX doesnt seem to be budling the epanet-engine for a UMD build
// overwriting the externals here will  force it to include everything into the final ouput
module.exports = {
  rollup(config, options) {

    if(options.format !== 'umd') {
      config.external = ['@model-create/epanet-engine']
      return config
    }

    config.external = [];


    return config;
  }
}