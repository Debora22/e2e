/* eslint-disable import/no-dynamic-require, no-process-env */
const extend = require('extend');

const configEnv = process.env.E2E_ENV || '';
const baseConfig = require('./config/protractor.base.config.js');

const envConfig = require(`./config/protractor.${configEnv}.config`);

const protractorConfig = extend(true, {}, baseConfig, envConfig);

module.exports = {
  config: protractorConfig,
};
