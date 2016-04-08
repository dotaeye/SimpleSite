import clientConfig from './client'
let serverConfig = {
  mongo:{
    data:'mongodb://localhost/simplesite'
  }
};
let config = Object.assign({}, clientConfig, serverConfig);
export default  config;