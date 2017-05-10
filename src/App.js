import 'whatwg-fetch';

import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import registerScreens from './screens';
import { iconsMap } from './utils/AppIcons';
import Colors from './styles/Colors';
import configureStore from './store/configureStore';

const store = configureStore();

registerScreens(store, Provider);


export const startApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'tasq.HomeScreen',
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
    animationType: 'fade',
    appStyle: {
      orientation: 'portrait',
      navBarNoBorder: true,
      topBarElevationShadowEnabled: false,
      navBarBackgroundColor: Colors.primary,
      statusBarColor: Colors.primary,
      navBarTextColor: 'white',
      navBarButtonColor: 'white',
      navBarTextFontFamily: 'Lato',
      statusBarTextColorScheme: 'light',
    },
  });
};

export const startLogin = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'tasq.LoginScreen',
      navigatorStyle: {
        navBarHidden: true,
      },
    },
    animationType: 'fade',
    appStyle: {
      orientation: 'portrait',
    },
  });
};


AsyncStorage.getItem('jwt').then((jwt) => {
  if (jwt) {
    startApp();
  } else {
    startLogin();
  }
});
