import React from 'react';

import Search from '../containers/Search/Search';


const SearchScreen = props => <Search {...props} />;


SearchScreen.navigatorStyle = {
  navBarHidden: true,
  navBarNoBorder: true,
  topBarElevationShadowEnabled: false,
  statusBarTextColorScheme: 'light',
};


export default SearchScreen;
