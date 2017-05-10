import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import TasksScreen from './TasksScreen';
import TaskEditScreen from './TaskEditScreen';
import TaskCreateScreen from './TaskCreateScreen';
import ProjectEditScreen from './ProjectEditScreen';
import ProjectCreateScreen from './ProjectCreateScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import SpinnerScreen from './SpinnerScreen';


export default function registerScreens(store, Provider) {
  Navigation.registerComponent('tasq.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('tasq.HomeScreen', () => HomeScreen, store, Provider);
  Navigation.registerComponent('tasq.TasksScreen', () => TasksScreen, store, Provider);
  Navigation.registerComponent('tasq.TaskEditScreen', () => TaskEditScreen, store, Provider);
  Navigation.registerComponent('tasq.TaskCreateScreen', () => TaskCreateScreen, store, Provider);
  Navigation.registerComponent('tasq.ProjectEditScreen', () => ProjectEditScreen, store, Provider);
  Navigation.registerComponent('tasq.ProjectCreateScreen', () => ProjectCreateScreen, store, Provider);
  Navigation.registerComponent('tasq.ProfileScreen', () => ProfileScreen, store, Provider);
  Navigation.registerComponent('tasq.SearchScreen', () => SearchScreen, store, Provider);
  Navigation.registerComponent('tasq.SpinnerScreen', () => SpinnerScreen, store, Provider);
}
