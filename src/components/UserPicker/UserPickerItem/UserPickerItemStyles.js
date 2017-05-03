import { StyleSheet } from 'react-native';
import BaseStyles from '../../../styles/Base';
import Colors from '../../../styles/Colors';


export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    height: 60,
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  name: {
    ...BaseStyles.text,
    marginHorizontal: 15,
    flexShrink: 1,
  },
  user: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  userText: {
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
