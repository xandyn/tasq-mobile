import { Navigation } from 'react-native-navigation';

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';


export function registerScreens(store, Provider) {
  Navigation.registerComponent('tasq.Home', () => Home, store, Provider);
  Navigation.registerComponent('tasq.Login', () => Login, store, Provider);
}
