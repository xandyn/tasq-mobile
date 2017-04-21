import { StyleSheet, Dimensions } from 'react-native';
const Screen = Dimensions.get('window');


export default StyleSheet.create({
  button: {
    width: 75,
    color: 'white',
    textAlign: 'center',
  },
  mainHolder: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 60,
  },
  trashHolder: {
    position: 'absolute',
    top: 0,
    left: Screen.width - 75,
    width: Screen.width,
    height: 60,
    backgroundColor: '#D9853B',
    justifyContent: 'center'
  },
  doneHolder: {
    position: 'absolute',
    top: 0,
    right: Screen.width - 75,
    width: Screen.width,
    height: 60,
    backgroundColor: '#2f9a5d',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
