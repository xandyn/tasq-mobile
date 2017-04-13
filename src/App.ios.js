import React from 'react';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import { iconsMap, iconsLoaded } from './utils/AppIcons';

registerScreens();


const navigatorStyle = {
  statusBarColor: '#831d19',
  navigationBarColor: '#339999',
  navBarBackgroundColor: '#339999',
  navBarTextColor: '#ffffff',
  navBarButtonColor: '#ffffff',
  statusBarTextColorScheme: 'light',
  navBarHidden: true,
  tabBarButtonColor: 'red',
  tabBarSelectedButtonColor: 'red',
  tabBarBackgroundColor: 'red'
};


const startApp = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'One',
        screen: 'tasq.FirstTabScreen',
        icon: iconsMap['ios-person'],
        selectedIcon: iconsMap['ios-person--active'],
        title: 'Hello World',
        navigatorStyle
      },
      {
        label: 'Two',
        screen: 'tasq.SecondTabScreen',
        icon: iconsMap['ios-chatbubbles'],
        selectedIcon: iconsMap['ios-chatbubbles--active'],
        title: 'Test Title 2',
        navigatorStyle
      }
    ],
    animationType: 'fade'
  });
};


iconsLoaded.then(() => {
  startApp();
});
