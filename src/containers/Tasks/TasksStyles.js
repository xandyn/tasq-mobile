import { StyleSheet } from 'react-native';
import BaseStyles from '../../styles/Base';


export default StyleSheet.create({
  container: {
    ...BaseStyles.container,
    width: '100%',
  },
  tasksSwitcher: {
    ...BaseStyles.btn,
    ...BaseStyles.btnBigCentered,
    minWidth: 200,
  },
  tasksSwitcherText: {
    ...BaseStyles.text,
    color: 'white',
    fontSize: 13,
  },
  tasksUncompleted: {
    flexGrow: 0,
  },
  tasksCompleted: {
    flexGrow: 0,
  },
});
