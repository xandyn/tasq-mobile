import 'whatwg-fetch';

import React from 'react';
import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';
import { iconsMap } from './utils/AppIcons';
import configureStore from './store/configureStore';

const store = configureStore();

registerScreens(store, Provider);


export const startApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'tasq.Home',
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
    animationType: 'fade'
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
    animationType: 'fade'
  });
};


AsyncStorage.getItem('jwt').then(jwt => {
  if (jwt) {
    startApp();
  } else {
    startLogin();
  }
});
