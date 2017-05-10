const types = {};


types.FILL_PROFILE = 'profile/FILL_PROFILE';
export function profileFill(payload) {
  return {
    type: types.FILL_PROFILE,
    payload
  };
}

types.CLEAR_PROFILE = 'profile/CLEAR_PROFILE';
export function profileClear() {
  return {
    type: types.CLEAR_PROFILE
  };
}

types.FETCH_PROFILE = 'profile/FETCH_PROFILE';
export function profileFetch(payload) {
  return {
    type: types.FETCH_PROFILE,
    payload
  };
}

types.FETCH_PROFILE_STATE = 'profile/FETCH_PROFILE_STATE';
export function profileFetching(payload) {
  return {
    type: types.FETCH_PROFILE_STATE,
    payload
  };
}

types.EDIT_PROFILE_REQUEST = 'profile/EDIT_PROFILE_REQUEST';
export function profileEditRequest(payload) {
  return {
    type: types.EDIT_PROFILE_REQUEST,
    payload
  };
}

types.EDIT_PROFILE_SUCCESS = 'profile/EDIT_PROFILE_SUCCESS';
export function profileEditSuccess(payload) {
  return {
    type: types.EDIT_PROFILE_SUCCESS,
    payload
  };
}

types.EDIT_PROFILE_FAILURE = 'profile/EDIT_PROFILE_FAILURE';
export function profileEditFailure(payload) {
  return {
    type: types.EDIT_PROFILE_FAILURE,
    payload
  };
}

types.EDIT_PROFILE_STATE = 'profile/EDIT_PROFILE_STATE';
export function profileEditing(payload) {
  return {
    type: types.EDIT_PROFILE_STATE,
    payload
  };
}


export default types;
