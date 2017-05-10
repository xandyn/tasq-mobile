import { StyleSheet, Platform } from 'react-native';
import BaseStyles from '../../styles/Base';
import Colors from '../../styles/Colors';


export default StyleSheet.create({
  container: {
    ...BaseStyles.container,
    width: '100%',
  },
  navBarWrapper: {
    ...Platform.select({
      ios: {
        paddingTop: 20,
        height: 64,
      },
      android: {
        paddingTop: 0,
        height: 56,
      }
    }),
    backgroundColor: Colors.primary,
  },
  navBar: {
    ...Platform.select({
      ios: {
        height: 44,
      },
      android: {
        height: 56,
      }
    }),
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  input: {
    ...BaseStyles.input,
    alignSelf: 'flex-end',
    flexGrow: 1,
    color: 'white',
    ...Platform.select({
      ios: {
        height: 44,
      },
      android: {
        height: 56,
      }
    }),
    paddingHorizontal: 5,
  },
  backBtn: {
    ...Platform.select({
      ios: {
        marginLeft: 0,
      },
      android: {
        marginLeft: 10,
      }
    }),
    paddingHorizontal: 8,
  },
  clearBtn: {
    height: 30,
    paddingHorizontal: 15,
  }
});
