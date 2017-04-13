import React from 'react';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import { iconsLoaded } from './utils/AppIcons';

registerScreens();


const navigatorStyle = {
  statusBarColor: 'black',
  statusBarTextColorScheme: 'light',
  navigationBarColor: 'black',
  navBarBackgroundColor: '#0a0a0a',
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  tabBarButtonColor: 'red',
  tabBarSelectedButtonColor: 'red',
  tabBarBackgroundColor: 'white',
  topBarElevationShadowEnabled: false,
  navBarHideOnScroll: true,
  tabBarHidden: true,
  drawUnderTabBar: true
};


const startApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'tasq.FirstTabScreen',
      title: 'first tab',
      navigatorStyle,
      leftButtons: [
        {
          id: 'sideMenu'
        }
      ]
    }
  });
};


iconsLoaded.then(() => {
  startApp();
});
