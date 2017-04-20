import { StyleSheet } from 'react-native';
import BaseStyles from '../../styles/Base';


export default StyleSheet.create({
  container: {
    ...BaseStyles.container,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
