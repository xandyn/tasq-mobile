import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../styles/Colors';


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
    backgroundColor: Colors.red,
    justifyContent: 'center'
  },
  doneHolder: {
    position: 'absolute',
    top: 0,
    right: Screen.width - 75,
    width: Screen.width,
    height: 60,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
