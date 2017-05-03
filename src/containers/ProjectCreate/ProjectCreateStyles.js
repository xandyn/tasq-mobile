import { StyleSheet } from 'react-native';
import BaseStyles from '../../styles/Base';


export default StyleSheet.create({
  container: {
    ...BaseStyles.container,
    backgroundColor: 'white',
  },
  input: {
    ...BaseStyles.input,
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});
