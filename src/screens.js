import { Navigation } from 'react-native-navigation';

import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import SideMenu from './containers/SideMenu/SideMenu';
import Tasks from './containers/Tasks/Tasks';
import TaskEdit from './containers/TaskEdit/TaskEdit';
import TaskCreate from './containers/TaskCreate/TaskCreate';
import ProjectEdit from './containers/ProjectEdit/ProjectEdit';
import ProjectCreate from './containers/ProjectCreate/ProjectCreate';


export default function registerScreens(store, Provider) {
  Navigation.registerComponent('tasq.Login', () => Login, store, Provider);
  Navigation.registerComponent('tasq.Home', () => Home, store, Provider);
  Navigation.registerComponent('tasq.SideMenu', () => SideMenu, store, Provider);
  Navigation.registerComponent('tasq.Tasks', () => Tasks, store, Provider);
  Navigation.registerComponent('tasq.TaskEdit', () => TaskEdit, store, Provider);
  Navigation.registerComponent('tasq.TaskCreate', () => TaskCreate, store, Provider);
  Navigation.registerComponent('tasq.ProjectEdit', () => ProjectEdit, store, Provider);
  Navigation.registerComponent('tasq.ProjectCreate', () => ProjectCreate, store, Provider);
}
