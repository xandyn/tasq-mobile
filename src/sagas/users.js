import { startSubmit, stopSubmit, reset } from 'redux-form';
import { call, put, takeLatest } from 'redux-saga/effects';

import types, {
  userAdd, userAddToProject, userRemoveFromProject, userRemoving,
  userInviteSuccess, userInviteFailure,
} from '../actions/users';
import { userInvite, userInviteReject, projectCollaboratorDelete } from '../api';
import { defaults } from '../api/schema';


export function* inviteUser({ payload }) {
  yield put(startSubmit('CollaboratorsForm'));
  const { response, error } = yield call(userInvite, payload);

  if (response) {
    yield put(userInviteSuccess());
    yield put(stopSubmit('CollaboratorsForm'));
    yield put(reset('CollaboratorsForm'));
    const entity = { ...response, ...defaults };
    yield put(userAdd(entity));
    yield put(userAddToProject(payload.project_id.toString(), entity));
  } else {
    yield put(userInviteFailure(error));
    yield put(stopSubmit('CollaboratorsForm', error));
  }
}


export function* inviteReject({ meta: { id }, payload }) {
  yield put(userRemoving(payload.email, true));
  const { response } = yield call(userInviteReject, payload);

  if (response) {
    yield put(userRemoveFromProject(id, payload));
  }
  yield put(userRemoving(payload.email, false));
}


export function* collaboratorDelete({ meta: { id }, payload }) {
  yield put(userRemoving(payload.email, true));
  const { response } = yield call(projectCollaboratorDelete, payload);

  if (response) {
    yield put(userRemoveFromProject(id, payload));
  }
  yield put(userRemoving(payload.email, false));
}


export function* watchInviteUser() {
  yield takeLatest(types.INVITE_USER_REQUEST, inviteUser);
}

export function* watchInviteReject() {
  yield takeLatest(types.INVITE_USER_REJECT, inviteReject);
}

export function* watchCollaboratorDelete() {
  yield takeLatest(types.COLLABORATOR_DELETE, collaboratorDelete);
}


export default [
  watchInviteUser,
  watchInviteReject,
  watchCollaboratorDelete,
];
