import { StyleSheet, Dimensions, Platform } from 'react-native';


const BaseStyles = {
  container: {
    flex: 1,
    backgroundColor: '#F4F3F1',
  },
  btn: {
    backgroundColor: '#568D8A',
    borderRadius: 3,
  },
  text: {
    color: 'white',
    fontFamily: 'Lato'
  },
};

export default { ...BaseStyles };
