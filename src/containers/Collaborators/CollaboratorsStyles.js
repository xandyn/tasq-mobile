import { StyleSheet, Dimensions } from 'react-native';
import BaseStyles from '../../styles/Base';


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
    shadowColor: '#3b3b3b',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1
    },
  },
  icon: {
    textAlign: 'center',
    color: '#ACAEB2',
    paddingHorizontal: 20,
  },
  input: {
    ...BaseStyles.input,
    height: 55,
    width: width * 0.65,
  },
  label: {
    ...BaseStyles.label,
    marginTop: 30,
    marginBottom: 15,
    marginLeft: 20,
  },
});
