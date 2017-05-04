import React from 'react';

import Home from '../containers/Home/Home';
import Colors from '../styles/Colors';


const HomeScreen = props => <Home {...props} />;


HomeScreen.navigatorStyle = {
  navBarNoBorder: true,
  topBarElevationShadowEnabled: false,
  navBarBackgroundColor: Colors.primary,
  statusBarColor: Colors.primary,
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  navBarTextFontFamily: 'Lato',
  statusBarTextColorScheme: 'light',
};


export default HomeScreen;
