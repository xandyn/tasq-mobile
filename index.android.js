import { iconsLoaded } from './src/utils/AppIcons';

iconsLoaded.then(() => {
  require('./src/config/reactotronConfig');
  const App = require('./src/App');
  app = new App();
});
