import React from 'react';

import Profile from '../containers/Profile/Profile';
import { iconsMap } from '../utils/AppIcons';


const ProfileScreen = props => <Profile {...props} />;


ProfileScreen.navigatorStyle = {
};

ProfileScreen.navigatorButtons = {
  rightButtons: [{
    title: 'Save',
    id: 'saveProfile',
    icon: iconsMap['ios-checkmark--big']
  }]
};

export default ProfileScreen;
