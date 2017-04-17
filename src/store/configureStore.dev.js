import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'remote-redux-devtools';
import Reactotron from 'reactotron-react-native';
import rootSaga from '../sagas';
import rootReducer from '../reducers';


const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: Reactotron.createSagaMonitor()
});

const middlewares = [
  sagaMiddleware
];


function configureStore(initialState) {
  const store = Reactotron.createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middlewares)
    )
  );

  let rootTask = sagaMiddleware.run(rootSaga);
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
    module.hot.accept('./sagas', () => {
      rootTask.cancel();
      rootTask = sagaMiddleware.run(rootSaga);
    });
  }
  return store;
}

export default configureStore;
