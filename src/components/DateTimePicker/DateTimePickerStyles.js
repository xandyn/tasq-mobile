import { StyleSheet } from 'react-native';
import BaseStyles from '../../styles/Base';
import Colors from '../../styles/Colors';


export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    height: 60,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginBottom: 1,
  },
  date: {
  },
  dateText: {
    ...BaseStyles.input,
    color: Colors.textPrimary,
  },
  placeholder: {
    ...BaseStyles.text,
    fontSize: 18,
    color: Colors.textSecondary,
  },
  clear: {
    marginLeft: 'auto',
  },
});
