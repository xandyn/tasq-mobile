import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    paddingLeft: 10,
  },
  icon: {
    height: 27,
    width: 40,
    textAlign: 'center',
    color: '#ACAEB2',
    paddingRight: 10,
  },
  name: {
    paddingRight: 10,
    fontSize: 18,
    fontFamily: 'Lato',
    color: '#3B3B3B',
    flexShrink: 1,
  },
});
