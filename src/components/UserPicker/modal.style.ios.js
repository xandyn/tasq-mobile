import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';


export default StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
  },
  usersContainer: {
    marginBottom: 20,
  },
  userPickerContainer: {
    backgroundColor: 'white',
    borderRadius: 14,
    marginBottom: 10,
  },
  titleContainer: {
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 12,
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    color: Colors.textPrimary,
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderRadius: 14,
  },
  cancelText: {
    padding: 10,
    textAlign: 'center',
    color: Colors.blue,
    fontSize: 24,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
});
