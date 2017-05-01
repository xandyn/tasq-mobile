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
    alignItems: 'center',
    backgroundColor: Colors.blue,
    borderRadius: ButtonPosition.height / 2,
    bottom: ButtonPosition.bottom,
    height: ButtonPosition.height,
    justifyContent: 'center',
    position: 'absolute',
    right: ButtonPosition.right,
    width: ButtonPosition.width,
  },
  buttonIconLine: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 2,
    width: 14,
  },
});
