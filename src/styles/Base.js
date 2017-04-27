import { Dimensions } from 'react-native';
import Colors from './Colors';


const { width } = Dimensions.get('window');
const BaseStyles = {
  container: {
    flex: 1,
    backgroundColor: '#F4F3F1',
  },
  btn: {
    backgroundColor: '#568D8A',
    borderRadius: 3,
  },
  btnBigCentered: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    paddingVertical: 10,
    width: width * 0.6,
    shadowColor: Colors.dark,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  text: {
    color: '#3B3B3B',
    fontFamily: 'Lato',
  },
  label: {
    color: '#747474',
    fontFamily: 'Lato',
    fontSize: 12,
  },
  input: {
    color: '#3B3B3B',
    fontFamily: 'Lato',
    fontSize: 18,
  },
};

export default { ...BaseStyles };
