/* eslint-disable */
import Reactotron, { asyncStorage } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';


console.disableYellowBox = true;

if (__DEV__) {
  Reactotron.configure()
    .use(reactotronRedux())
    .use(asyncStorage())
    .use(sagaPlugin())
    .connect();

  console.tron = Reactotron;
  Reactotron.clear();
}
