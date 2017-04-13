import { Navigation } from 'react-native-navigation';

import FirstTabScreen from './FirstTabScreen';
import SecondTabScreen from './SecondTabScreen';


export function registerScreens(store, Provider) {
  Navigation.registerComponent('tasq.FirstTabScreen', () => FirstTabScreen, store, Provider);
  Navigation.registerComponent('tasq.SecondTabScreen', () => SecondTabScreen, store, Provider);
}
