import { iconsLoaded } from './src/utils/AppIcons';

iconsLoaded.then(() => {
  require('./src/config/reactotronConfig');
  require('./src/App');
});
