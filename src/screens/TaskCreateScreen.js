import React from 'react';
import { Platform } from 'react-native';

import TaskCreate from '../containers/TaskCreate/TaskCreate';
import { iconsMap } from '../utils/AppIcons';


const TaskCreateScreen = props => <TaskCreate {...props} />;


TaskCreateScreen.navigatorStyle = {
  navBarTextFontFamily: 'Lato',
  navBarTitleTextCentered: true,
};

TaskCreateScreen.navigatorButtons = {
  leftButtons: [{
    title: 'Close',
    id: 'back',
  }],
  rightButtons: [
    Platform.OS === 'ios' ? {
      title: 'Done',
      id: 'saveTask',
    } : {
      title: 'Save',
      id: 'saveTask',
      icon: iconsMap['ios-checkmark--big']
    }
  ]
};


export default TaskCreateScreen;
