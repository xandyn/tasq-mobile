import { StyleSheet } from 'react-native';
import BaseStyles from '../../styles/Base';
import Colors from '../../styles/Colors';


export default StyleSheet.create({
  container: {
    ...BaseStyles.container,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  inputContainer: {
    height: 50,
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginTop: 10,
    marginBottom: 15,
  },
  input: {
    ...BaseStyles.input,
    height: 60,
    width: '100%',
    paddingHorizontal: 5,
    color: 'white',
  },
  avatar: {
    padding: 8,
    borderRadius: 96,
    backgroundColor: 'white',
  },
  menu: {},
  menuItem: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menuIcon: {
    paddingLeft: 5,
    paddingRight: 15,
  },
  menuText: {
    ...BaseStyles.text,
    fontSize: 18,
  },
});
