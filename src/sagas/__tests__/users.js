import sagaHelper from 'redux-saga-testing';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import { call, put } from 'redux-saga/effects';

import {
  userAdd, userAddToProject, userRemoveFromProject, userRemoving,
  userInviteSuccess, userInviteFailure,
} from '../../actions/users';
import { userInvite, userInviteReject, projectCollaboratorDelete } from '../../api';
import { defaults } from '../../api/schema';

import { inviteUser, inviteReject, collaboratorDelete } from '../users';


describe('`inviteUser` Saga test', () => {
  describe('Scenario 1: Success user invite', () => {
    const payload = { email: 'jacksonmark@mckee.com', project_id: 53 };
    const response = { email: 'jacksonmark@mckee.com', code: 'test code' };
    const entity = { ...response, ...defaults };
    const it = sagaHelper(inviteUser({ payload }));

    it('start submit CollaboratorsForm', (result) => {
      expect(result).toEqual(put(startSubmit('CollaboratorsForm')));
    });

    it('call API', (result) => {
      expect(result).toEqual(call(userInvite, payload));
      return { response };
    });

    it('fire `userInviteSuccess` action', (result) => {
      expect(result).toEqual(put(userInviteSuccess()));
    });

    it('stop submit CollaboratorsForm', (result) => {
      expect(result).toEqual(put(stopSubmit('CollaboratorsForm')));
    });

    it('reset CollaboratorsForm', (result) => {
      expect(result).toEqual(put(reset('CollaboratorsForm')));
    });

    it('add invited user to users entity', (result) => {
      expect(result).toEqual(put(userAdd(entity)));
    });

    it('add invited user to project collaborators', (result) => {
      expect(result).toEqual(put(userAddToProject(payload.project_id.toString(), entity)));
    });

    it('end.', (result) => {
      expect(result).toBeUndefined();
    });
  });


  describe('Scenario 2: Failure user invite', () => {
    const payload = { email: 'jacksonmark@mckee.com', project_id: 53 };
    const error = { email: 'User already invited.' };
    const it = sagaHelper(inviteUser({ payload }));

    it('start submit CollaboratorsForm', (result) => {
      expect(result).toEqual(put(startSubmit('CollaboratorsForm')));
    });

    it('call API', (result) => {
      expect(result).toEqual(call(userInvite, payload));
      return { error };
    });

    it('fire `userInviteFailure` action', (result) => {
      expect(result).toEqual(put(userInviteFailure(error)));
    });

    it('stop submit CollaboratorsForm', (result) => {
      expect(result).toEqual(put(stopSubmit('CollaboratorsForm', error)));
    });

    it('end.', (result) => {
      expect(result).toBeUndefined();
    });
  });
});


describe('`inviteReject` Saga test', () => {
  const id = 54;
  const payload = { email: 'jacksonmark@mckee.com' };
  const response = {};
  const it = sagaHelper(inviteReject({ meta: { id }, payload }));

  it('change REMOVING_STATE to `true`', (result) => {
    expect(result).toEqual(put(userRemoving(payload.email, true)));
  });

  it('call API', (result) => {
    expect(result).toEqual(call(userInviteReject, payload));
    return { response };
  });

  it('remove pending collaborator from project', (result) => {
    expect(result).toEqual(put(userRemoveFromProject(id, payload)));
  });

  it('change REMOVING_STATE to `false`', (result) => {
    expect(result).toEqual(put(userRemoving(payload.email, false)));
  });

  it('end.', (result) => {
    expect(result).toBeUndefined();
  });
});


describe('`collaboratorDelete` Saga test', () => {
  const id = 54;
  const payload = { email: 'jacksonmark@mckee.com' };
  const response = {};
  const it = sagaHelper(collaboratorDelete({ meta: { id }, payload }));

  it('change REMOVING_STATE to `true`', (result) => {
    expect(result).toEqual(put(userRemoving(payload.email, true)));
  });

  it('call API', (result) => {
    expect(result).toEqual(call(projectCollaboratorDelete, payload));
    return { response };
  });

  it('remove actual collaborator from project', (result) => {
    expect(result).toEqual(put(userRemoveFromProject(id, payload)));
  });

  it('change REMOVING_STATE to `false`', (result) => {
    expect(result).toEqual(put(userRemoving(payload.email, false)));
  });

  it('end.', (result) => {
    expect(result).toBeUndefined();
  });
});
