const base = require('./base');
const dev = require('./dev');
const prod = require('./prod');

const env = process.env.NODE_ENV || 'dev';

const configMap = {
  dev,
  prod
}


module.exports = {...base, ...configMap[env]};
