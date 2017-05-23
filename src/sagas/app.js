import { spawn } from 'redux-saga/effects';
import codePush from 'react-native-code-push';
import codePushSaga from 'react-native-code-push-saga';


function* main() {
  yield spawn(codePushSaga, {
    syncOnInterval: 30 * 60,
    syncOptions: {
      installMode: codePush.InstallMode.ON_NEXT_RESUME
    }
  });
}

export default [
  main,
];
