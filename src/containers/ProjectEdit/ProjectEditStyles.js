import { StyleSheet, Dimensions } from 'react-native';
import BaseStyles from '../../styles/Base';
import Colors from '../../styles/Colors';


const { width } = Dimensions.get('window');
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
    shadowColor: Colors.dark,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1
    },
  },
  icon: {
    textAlign: 'center',
    color: Colors.icon,
    paddingHorizontal: 20,
  },
  input: {
    ...BaseStyles.input,
    height: 55,
    width: width * 0.85,
  },
  label: {
    ...BaseStyles.label,
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  delete: {
    ...BaseStyles.btn,
    ...BaseStyles.btnBigCentered,
    backgroundColor: 'white',
  },
  deleteText: {
    color: Colors.red,
    fontFamily: 'Lato',
    fontSize: 13,
  },
});
