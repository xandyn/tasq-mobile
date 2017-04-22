import { StyleSheet, Dimensions } from 'react-native';
import BaseStyles from '../../styles/Base';


const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    ...BaseStyles.container,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    ...BaseStyles.btn,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: width * 0.7,
  },
  btnText: {
    color: 'white',
    fontFamily: 'Lato',
    fontSize: 16,
  }
});
