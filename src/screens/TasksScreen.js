import React from 'react';

import Tasks from '../containers/Tasks/Tasks';
import { iconsMap } from '../utils/AppIcons';


const TasksScreen = props => <Tasks {...props} />;


TasksScreen.navigatorStyle = {
  navBarTextFontFamily: 'Lato',
  navBarTitleTextCentered: true,
};

TasksScreen.navigatorButtons = {
  rightButtons: [{
    title: 'Edit',
    id: 'editProject',
    icon: iconsMap.pencil
  }]
};


export default TasksScreen;
