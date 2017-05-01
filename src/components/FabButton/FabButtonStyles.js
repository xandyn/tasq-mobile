import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';


const ButtonPosition = {
  bottom: 38,
  height: 48,
  right: 30,
  width: 48,
};
export default StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: ButtonPosition.right,
    bottom: ButtonPosition.bottom,
    width: ButtonPosition.width,
    height: ButtonPosition.height,
    backgroundColor: Colors.blue,
    borderRadius: ButtonPosition.height / 2,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: ButtonPosition.width,
  },
});
