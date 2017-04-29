import { StyleSheet, Platform } from 'react-native';
import BaseStyles from '../../styles/Base';
import Colors from '../../styles/Colors';


export default StyleSheet.create({
  container: {
    ...BaseStyles.container,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  icon: {
    textAlign: 'center',
    color: Colors.icon,
    paddingHorizontal: 20,
  },
  input: {
    ...BaseStyles.input,
    height: 60,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 1,
  },
  textArea: {
    ...BaseStyles.input,
    textAlignVertical: 'top',
    paddingVertical: Platform.OS === 'ios' ? 10 : 20,
    paddingHorizontal: 20,
    height: 180,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 1,
  },
  datePicker: {
    justifyContent: 'center',
    height: 60,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 1,
  },
  datePickerText: {
    ...BaseStyles.input,
    color: Colors.textPrimary,
  },
  delete: {
    ...BaseStyles.btn,
    ...BaseStyles.btnBigCentered,
    marginTop: 20,
    backgroundColor: 'white',
  },
  deleteText: {
    color: Colors.red,
    fontFamily: 'Lato',
    fontSize: 13,
  },
});
