import { Dimensions } from 'react-native';
import Colors from './Colors';


const { width } = Dimensions.get('window');
const BaseStyles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  btn: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
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
    color: Colors.textPrimary,
    fontFamily: 'Lato',
  },
  label: {
    color: Colors.gray,
    fontFamily: 'Lato',
    fontSize: 12,
  },
  input: {
    color: Colors.textPrimary,
    fontFamily: 'Lato',
    fontSize: 18,
  },
};

export default { ...BaseStyles };
