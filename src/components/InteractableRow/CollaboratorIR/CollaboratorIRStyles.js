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
    height: 50,
  },
  trashHolder: {
    position: 'absolute',
    top: 0,
    left: Screen.width - 75,
    width: Screen.width,
    height: 50,
    backgroundColor: Colors.red,
    justifyContent: 'center'
  },
  flagHolder: {
    position: 'absolute',
    top: 0,
    right: Screen.width - 75,
    width: Screen.width,
    height: 50,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
