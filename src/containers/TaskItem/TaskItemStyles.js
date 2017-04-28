import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';


export default StyleSheet.create({
  container: {
    flex: 1,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'white',
  },
  taskAssignee: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    margin: 20
  },
  taskText: {
    fontFamily: 'Lato',
    fontSize: 20,
    color: Colors.textPrimary,
    flexShrink: 1,
    marginHorizontal: 20,
  },
  taskTextCompleted: {
    fontFamily: 'Lato',
    fontSize: 20,
    color: Colors.textSecondary,
    flexShrink: 1,
    marginHorizontal: 20,
    textDecorationLine: 'line-through'
  },
  taskCompletion: {
    fontFamily: 'Lato',
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 5,
    marginHorizontal: 20,
  },
});
