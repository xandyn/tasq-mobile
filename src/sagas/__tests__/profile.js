import sagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';

import { profileFill, profileFetching } from '../../actions/profile';
import { logout } from '../../actions/auth';
import { profile } from '../../api';

import { fetchProfile } from '../profile';


describe('`fetchProfile` Saga test', () => {
  const response = { email: 'email@example.com', name: 'John' };
  const error = { error: 'Invalid JWT token' };

  describe('Scenario 1: Success profile request', () => {
    const it = sagaHelper(fetchProfile());

    it('change FETCH_STATE to `true`', (result) => {
      expect(result).toEqual(put(profileFetching(true)));
    });

    it('call API', (result) => {
      expect(result).toEqual(call(profile));
      return { response };
    });

    it('fill profile', (result) => {
      expect(result).toEqual(put(profileFill(response)));
    });

    it('change FETCH_STATE to `false`', (result) => {
      expect(result).toEqual(put(profileFetching(false)));
    });

    it('end.', (result) => {
      expect(result).toBeUndefined();
    });
  });


  describe('Scenario 2: Failed profile request', () => {
    const it = sagaHelper(fetchProfile());

    it('change FETCH_STATE to `true`', (result) => {
      expect(result).toEqual(put(profileFetching(true)));
    });

    it('call API', (result) => {
      expect(result).toEqual(call(profile));
      return { error };
    });

    it('logout', (result) => {
      expect(result).toEqual(put(logout()));
    });

    it('change FETCH_STATE to `false`', (result) => {
      expect(result).toEqual(put(profileFetching(false)));
    });

    it('end.', (result) => {
      expect(result).toBeUndefined();
    });
  });
});
