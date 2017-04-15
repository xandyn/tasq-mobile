/* eslint-disable global-require */
if (!__DEV__) {
  module.exports = require('./configureStore.prod.js');
} else {
  module.exports = require('./configureStore.dev');
}
/* eslint-enable global-require */
