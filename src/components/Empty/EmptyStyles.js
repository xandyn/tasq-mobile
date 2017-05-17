import { StyleSheet } from 'react-native';
import BaseStyles from '../../styles/Base';
import Colors from '../../styles/Colors';


export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  text: {
    ...BaseStyles.text,
    color: Colors.textSecondary,
    fontSize: 24,
    textAlign: 'center',
    width: '100%',
  },
});
