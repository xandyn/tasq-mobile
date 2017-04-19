import { Platform } from 'react-native';

module.exports = {
  baseUrl: `http://${Platform.OS === 'ios' ? 'localhost' : '10.0.3.2'}:5000`, // for Android Studio '10.0.2.2'
  staticUrl: '/'
};
