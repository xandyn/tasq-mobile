import { StyleSheet } from 'react-native';
import BaseStyles from '../../styles/Base';
import Colors from '../../styles/Colors';


export default StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
  },
  usersContainer: {
  },
  userPickerContainer: {
    backgroundColor: 'white',
  },
  titleContainer: {
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 12,
    backgroundColor: 'transparent',
  },
  title: {
    ...BaseStyles.text,
    textAlign: 'center',
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: 'white',
  },
  cancelText: {
    ...BaseStyles.text,
    padding: 12,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
});
