import 'whatwg-fetch';

import React from 'react';
import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';
import { iconsMap, iconsLoaded } from './utils/AppIcons';
import configureStore from './store/configureStore';

const store = configureStore();

registerScreens(store, Provider);


export const startApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'tasq.FirstTabScreen',
      title: '',
      navigatorStyle: {},
      navigatorButtons: {
        leftButtons: [
          {
            title: 'Profile',
            id: 'profile',
            icon: iconsMap['ios-person']
          }
        ],
        rightButtons: [
          {
            title: 'Search',
            id: 'search',
            icon: iconsMap['ios-search']
          }
        ]
      }
    },
    passProps: {},
    animationType: 'slide-down'
  });
};

export const startLogin = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'tasq.Login',
      navigatorStyle: {
        navBarHidden: true,
      },
    },
    animationType: 'slide-down'
  });
};


iconsLoaded.then(() => {
  AsyncStorage.getItem('jwt').then(jwt => {
    if (jwt) {
      startApp();
    } else {
      startLogin();
    }
  });
});
