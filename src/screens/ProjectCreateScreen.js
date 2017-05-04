import React from 'react';
import { Platform } from 'react-native';

import ProjectCreate from '../containers/ProjectCreate/ProjectCreate';
import { iconsMap } from '../utils/AppIcons';


const ProjectCreateScreen = props => <ProjectCreate {...props} />;


ProjectCreateScreen.navigatorStyle = {
  navBarTextFontFamily: 'Lato',
  navBarTitleTextCentered: true,
};

ProjectCreateScreen.navigatorButtons = {
  leftButtons: [{
    title: 'Close',
    id: 'back',
  }],
  rightButtons: [
    Platform.OS === 'ios' ? {
      title: 'Done',
      id: 'saveProject',
    } : {
      title: 'Save',
      id: 'saveProject',
      icon: iconsMap['ios-checkmark--big']
    }
  ]
};


export default ProjectCreateScreen;
