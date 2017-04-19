import { StyleSheet } from 'react-native';


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
    color: '#ACAEB2',
    paddingLeft: 5,
    paddingRight: 15,
  },
  name: {
    paddingRight: 10,
    fontSize: 18,
    fontFamily: 'Lato',
    color: '#3B3B3B',
    flexShrink: 1,
  },
  notifications: {
    marginLeft: 'auto',
    marginRight: 5,
    color: '#ACAEB2',
    fontFamily: 'Lato',
  }
});
