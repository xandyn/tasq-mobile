import { Navigation } from 'react-native-navigation';

import Home from './containers/Home/Home';
import Tasks from './containers/Tasks/Tasks';
import Login from './containers/Login/Login';


export function registerScreens(store, Provider) {
  Navigation.registerComponent('tasq.Home', () => Home, store, Provider);
  Navigation.registerComponent('tasq.Tasks', () => Tasks, store, Provider);
  Navigation.registerComponent('tasq.Login', () => Login, store, Provider);
}
