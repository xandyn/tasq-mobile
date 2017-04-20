import { StyleSheet } from 'react-native';
import BaseStyles from '../../styles/Base';


export default StyleSheet.create({
  container: {
    ...BaseStyles.container,
    width: '100%',
  },
  tasksSwitcher: {
    ...BaseStyles.btn,
    marginVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    minWidth: 200,
  },
  tasksSwitcherText: {
    ...BaseStyles.text,
    fontSize: 13,
  },
  tasksUncompleted: {
    flexGrow: 0,
  },
  tasksCompleted: {
    flexGrow: 0,
  },
});
