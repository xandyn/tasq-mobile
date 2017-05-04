import React from 'react';

import ProjectEdit from '../containers/ProjectEdit/ProjectEdit';
import { iconsMap } from '../utils/AppIcons';


const ProjectEditScreen = props => <ProjectEdit {...props} />;


ProjectEditScreen.navigatorStyle = {
  navBarTextFontFamily: 'Lato',
  navBarTitleTextCentered: true,
};

ProjectEditScreen.navigatorButtons = {
  rightButtons: [{
    title: 'Save',
    id: 'saveProject',
    icon: iconsMap['ios-checkmark--big']
  }]
};


export default ProjectEditScreen;
