import { StyleSheet } from 'react-native';
import BaseStyles from '../../styles/Base';
import Colors from '../../styles/Colors';


export default StyleSheet.create({
  container: {
    ...BaseStyles.container,
    backgroundColor: 'white',
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
    marginVertical: 10,
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
});
