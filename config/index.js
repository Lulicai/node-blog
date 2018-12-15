const fs = require("fs");
const defaultConfig = './config-default';
const productConfig = './config-prodution';

const env = 'development';
var config = null;

if(env == 'development'){
    config = require(defaultConfig);
}else{
    config = require(productConfig);
}

module.exports = config;
