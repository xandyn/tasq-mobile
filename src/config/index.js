/* eslint-disable global-require */
if (!__DEV__) {
  module.exports = require('./config.prod');
} else {
  module.exports = require('./config.dev');
}
/* eslint-enable global-require */
