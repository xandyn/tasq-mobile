import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');


export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: width * 0.7,
    backgroundColor: 'blue',
  },
  btnText: {
    color: 'white',
    fontFamily: 'Lato',
    fontSize: 16,
  }
});
