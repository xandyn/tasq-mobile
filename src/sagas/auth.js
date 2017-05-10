import { call, take, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

import types, { loginSuccess, loginFailure, signupSuccess, signupFailure } from '../actions/auth';
import { projectsClear } from '../actions/projects';
import { profileClear } from '../actions/profile';
import { tasksClear } from '../actions/tasks';
import { usersClear } from '../actions/users';
import Api, { login, signup } from '../api';
import { startApp, startLogin } from '../App';


export function* authorize({ payload }) {
  yield put(startSubmit('LoginForm'));
  const { response, error } = yield call(login, payload);

  if (response) {
    yield put(loginSuccess());
    yield put(stopSubmit('LoginForm'));

    const { token } = response;
    yield call(Api.storeItems, { jwt: token });
    yield call(startApp);
  } else {
    yield put(loginFailure(error));
    yield put(stopSubmit('LoginForm', error));
  }
}

function* logout() {
  yield call(startLogin);
  yield call(Api.clearItems, ['jwt', 'selectedProjectId']);
  yield [
    put(projectsClear()),
    put(profileClear()),
    put(tasksClear()),
    put(usersClear()),
  ];
}

export function* register({ payload }) {
  yield put(startSubmit('SignupForm'));
  const { response, error } = yield call(signup, payload);

  if (response) {
    yield put(signupSuccess());
    yield put(stopSubmit('SignupForm'));

    const { token } = response;
    yield call(Api.storeItems, { jwt: token });
    yield call(startApp);
  } else {
    yield put(signupFailure(error));
    yield put(stopSubmit('SignupForm', error));
  }
}


export function* watchLogin() {
  yield takeLatest(types.LOGIN_REQUEST, authorize);
  yield take(types.LOGIN_FAILURE);
  yield call(Api.clearItems, 'jwt');
}

export function* watchLogout() {
  yield takeEvery(types.LOGOUT, logout);
}

export function* watchSignup() {
  yield takeLatest(types.SIGNUP_REQUEST, register);
  yield take(types.SIGNUP_FAILURE);
  yield call(Api.clearItems, 'jwt');
}


export default [
  watchSignup,
  watchLogin,
  watchLogout
];
