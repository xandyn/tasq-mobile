import sagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

import { loginSuccess, loginFailure, signupSuccess, signupFailure } from '../../actions/auth';
import Api, { login, signup } from '../../api';

import { authorize, register } from '../auth';


describe('`authorize` Saga test', () => {
  const validCredentials = { email: 'email@example.com', password: '123456' };
  const token = 'testJWT';
  const startApp = jest.fn();

  describe('Scenario 1: Login with valid credentials', () => {
    const it = sagaHelper(authorize({ payload: validCredentials }));

    it('start submit LoginForm', (result) => {
      expect(result).toEqual(put(startSubmit('LoginForm')));
    });

    it('call API', (result) => {
      expect(result).toEqual(call(login, validCredentials));
      return { response: { token } };
    });

    it('fire `loginSuccess` action', (result) => {
      expect(result).toEqual(put(loginSuccess()));
    });

    it('stop submit LoginForm', (result) => {
      expect(result).toEqual(put(stopSubmit('LoginForm')));
    });

    it('store jwt token in localStorage', (result) => {
      expect(result).toEqual(call(Api.storeItems, { jwt: token }));
    });

    it('redirects to Home', (result) => {
      expect(result).toEqual(call(startApp));
    });

    it('end.', (result) => {
      expect(result).toBeUndefined();
    });
  });


  const invalidCredentials = { email: 'email@example.com', password: '123456111' };
  const error = {
    description: 'Invalid credentials',
    email: 'Invalid credentials',
    error: 'Bad Request',
    status_code: 401
  };

  describe('Scenario 2: Login with invalid credentials', () => {
    const it = sagaHelper(authorize({ payload: invalidCredentials }));

    it('start submit LoginForm', (result) => {
      expect(result).toEqual(put(startSubmit('LoginForm')));
    });

    it('call API with invalid credentials', (result) => {
      expect(result).toEqual(call(login, invalidCredentials));
      return { error };
    });

    it('fire `loginFailure` action', (result) => {
      expect(result).toEqual(put(loginFailure(error)));
    });

    it('stop submit LoginForm and pass error to form', (result) => {
      expect(result).toEqual(put(stopSubmit('LoginForm', error)));
    });

    it('end.', (result) => {
      expect(result).toBeUndefined();
    });
  });
});


describe('`register` Saga test', () => {
  describe('Scenario 1: Signup with valid credentials', () => {
    const validCredentials = { email: 'john01@example.com', password: '123456' };
    const token = 'testJWT';
    const it = sagaHelper(register({ payload: validCredentials }));
    const startApp = jest.fn();

    it('start submit SignupForm', (result) => {
      expect(result).toEqual(put(startSubmit('SignupForm')));
    });

    it('call API', (result) => {
      expect(result).toEqual(call(signup, validCredentials));
      return { response: { token } };
    });

    it('fire `signupSuccess` action', (result) => {
      expect(result).toEqual(put(signupSuccess()));
    });

    it('stop submit SignupForm', (result) => {
      expect(result).toEqual(put(stopSubmit('SignupForm')));
    });

    it('store jwt token in localStorage', (result) => {
      expect(result).toEqual(call(Api.storeItems, { jwt: token }));
    });

    it('redirects to Home', (result) => {
      expect(result).toEqual(call(startApp));
    });

    it('end.', (result) => {
      expect(result).toBeUndefined();
    });
  });


  describe('Scenario 2: Signup with invalid credentials', () => {
    const invalidCredentials = { email: 'email@example.com', password: '1' };
    const error = {
      email: ['This email already taken.'],
      password: ['Your password must be at least 6 characters.']
    };
    const it = sagaHelper(register({ payload: invalidCredentials }));

    it('start submit SignupForm', (result) => {
      expect(result).toEqual(put(startSubmit('SignupForm')));
    });

    it('call API with invalid credentials', (result) => {
      expect(result).toEqual(call(signup, invalidCredentials));
      return { error };
    });

    it('fire `signupFailure` action', (result) => {
      expect(result).toEqual(put(signupFailure(error)));
    });

    it('stop submit SignupForm and pass error to form', (result) => {
      expect(result).toEqual(put(stopSubmit('SignupForm', error)));
    });

    it('end.', (result) => {
      expect(result).toBeUndefined();
    });
  });
});
