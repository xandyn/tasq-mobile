import { StyleSheet, Dimensions } from 'react-native';
const Screen = Dimensions.get('window');


export default StyleSheet.create({
  container: {
    flex: 1,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'white',
  },
  taskAssignee: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#73d4e3',
    margin: 20
  },
  taskText: {
    fontFamily: 'Lato',
    fontSize: 20,
    color: '#3B3B3B',
    flexShrink: 1,
    marginHorizontal: 20,
  },
  taskTextCompleted: {
    fontFamily: 'Lato',
    fontSize: 20,
    color: '#8C8E90',
    flexShrink: 1,
    marginHorizontal: 20,
    textDecorationLine: 'line-through'
  },
  taskDue: {
    fontFamily: 'Lato',
    fontSize: 13,
    color: '#8C8E90',
    marginHorizontal: 20,
  },
  taskOverdue: {
    fontFamily: 'Lato',
    fontSize: 13,
    color: '#ff2060',
    marginHorizontal: 20,
  },
});
