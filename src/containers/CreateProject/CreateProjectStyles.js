import { StyleSheet } from 'react-native';
import BaseStyles from '../../styles/Base';
import Colors from '../../styles/Colors';


export default StyleSheet.create({
  container: {
    ...BaseStyles.container,
    backgroundColor: 'white',
  },
  input: {
    ...BaseStyles.input,
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    ...BaseStyles.btn,
    backgroundColor: Colors.background,
    marginRight: 10,
    width: 100,
    height: 30,
  },
  cancelText: {
    ...BaseStyles.text,
  },
  saveBtn: {
    ...BaseStyles.btn,
    backgroundColor: Colors.blue,
    marginRight: 10,
    width: 100,
    height: 30,
  },
  saveText: {
    ...BaseStyles.text,
    color: 'white',
  },
});
