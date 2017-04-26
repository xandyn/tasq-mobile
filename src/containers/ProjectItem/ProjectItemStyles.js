import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';


export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  icon: {
    height: 20,
    textAlign: 'center',
    color: Colors.icon,
    paddingLeft: 5,
    paddingRight: 15,
  },
  name: {
    paddingRight: 10,
    fontSize: 18,
    fontFamily: 'Lato',
    color: Colors.textPrimary,
    flexShrink: 1,
  },
  notifications: {
    marginLeft: 'auto',
    marginRight: 5,
    color: Colors.textSecondary,
    fontFamily: 'Lato',
  }
});
