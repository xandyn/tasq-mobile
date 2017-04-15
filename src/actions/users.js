const types = {};


types.FILL_USERS = 'users/FILL_USERS';
export function usersFill(payload) {
  return {
    type: types.FILL_USERS,
    payload
  };
}

types.CLEAR_USERS = 'users/CLEAR_USERS';
export function usersClear() {
  return {
    type: types.CLEAR_USERS
  };
}

types.ADD_USER = 'users/ADD_USER';
export function userAdd(payload) {
  return {
    type: types.ADD_USER,
    payload
  };
}

types.ADD_USER_TO_PROJECT = 'users/ADD_USER_TO_PROJECT';
export function userAddToProject(id, payload) {
  return {
    type: types.ADD_USER_TO_PROJECT,
    payload,
    meta: { id }
  };
}

types.REMOVE_USER = 'users/REMOVE_USER';
export function userRemove(payload) {
  return {
    type: types.REMOVE_USER,
    payload
  };
}

types.REMOVE_USER_FROM_PROJECT = 'users/REMOVE_USER_FROM_PROJECT';
export function userRemoveFromProject(id, payload) {
  return {
    type: types.REMOVE_USER_FROM_PROJECT,
    payload,
    meta: { id }
  };
}

types.REMOVE_USER_STATE = 'users/REMOVE_USER_STATE';
export function userRemoving(id, payload) {
  return {
    type: types.REMOVE_USER_STATE,
    payload,
    meta: { id }
  };
}


types.INVITE_USER_REQUEST = 'users/INVITE_USER_REQUEST';
export function userInviteRequest(payload) {
  return {
    type: types.INVITE_USER_REQUEST,
    payload
  };
}

types.INVITE_USER_SUCCESS = 'users/INVITE_USER_SUCCESS';
export function userInviteSuccess(payload) {
  return {
    type: types.INVITE_USER_SUCCESS,
    payload
  };
}

types.INVITE_USER_FAILURE = 'users/INVITE_USER_FAILURE';
export function userInviteFailure(payload) {
  return {
    type: types.INVITE_USER_FAILURE,
    payload
  };
}


types.INVITE_USER_REJECT = 'users/INVITE_USER_REJECT';
export function userInviteReject(id, payload) {
  return {
    type: types.INVITE_USER_REJECT,
    payload,
    meta: { id }
  };
}

types.INVITE_USER_ACCEPT = 'users/INVITE_USER_ACCEPT';
export function userInviteAccept(id, payload) {
  return {
    type: types.INVITE_USER_ACCEPT,
    payload,
    meta: { id }
  };
}

types.COLLABORATOR_DELETE = 'users/COLLABORATOR_DELETE';
export function collaboratorDelete(id, payload) {
  return {
    type: types.COLLABORATOR_DELETE,
    payload,
    meta: { id }
  };
}


export default types;
