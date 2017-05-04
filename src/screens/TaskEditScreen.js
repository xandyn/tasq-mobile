import React from 'react';

import TaskEdit from '../containers/TaskEdit/TaskEdit';
import { iconsMap } from '../utils/AppIcons';


const TaskEditScreen = props => <TaskEdit {...props} />;


TaskEditScreen.navigatorStyle = {
  navBarTextFontFamily: 'Lato',
  navBarTitleTextCentered: true,
};

TaskEditScreen.navigatorButtons = {
  rightButtons: [{
    title: 'Save',
    id: 'saveTask',
    icon: iconsMap['ios-checkmark--big']
  }]
};


export default TaskEditScreen;
