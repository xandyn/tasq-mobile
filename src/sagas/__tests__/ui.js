import sagaHelper from 'redux-saga-testing';
import { call } from 'redux-saga/effects';

import Api from '../../api';

import { selectProject } from '../ui';


describe('`selectProject` Saga test', () => {
  const payload = 54;
  const it = sagaHelper(selectProject({ payload }));

  it('store selectedProjectId in localStorage', (result) => {
    expect(result).toEqual(call(Api.storeItems, { selectedProjectId: payload }));
  });

  it('end.', (result) => {
    expect(result).toBeUndefined();
  });
});
