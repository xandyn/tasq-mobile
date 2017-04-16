import { Navigation } from 'react-native-navigation';

import Login from './containers/Login/Login'
import FirstTabScreen from './FirstTabScreen';
import SecondTabScreen from './SecondTabScreen';


export function registerScreens(store, Provider) {
  Navigation.registerComponent('tasq.Login', () => Login, store, Provider);
  Navigation.registerComponent('tasq.FirstTabScreen', () => FirstTabScreen, store, Provider);
  Navigation.registerComponent('tasq.SecondTabScreen', () => SecondTabScreen, store, Provider);
}
