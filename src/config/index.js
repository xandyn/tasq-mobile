/* eslint-disable global-require, no-undef */
if (!__DEV__) {
  module.exports = require('./config.prod');
} else {
  module.exports = require('./config.dev');
}
/* eslint-enable global-require, no-undef */
