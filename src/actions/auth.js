const types = {};


types.LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload
  };
}

types.LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export function loginSuccess() {
  return {
    type: types.LOGIN_SUCCESS,
    payload: true
  };
}

types.LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload
  };
}

types.LOGOUT = 'auth/LOGOUT';
export function logout() {
  return {
    type: types.LOGOUT
  };
}


types.SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST';
export function signupRequest(payload) {
  return {
    type: types.SIGNUP_REQUEST,
    payload
  };
}

types.SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
export function signupSuccess() {
  return {
    type: types.SIGNUP_SUCCESS,
    payload: true
  };
}

types.SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE';
export function signupFailure(payload) {
  return {
    type: types.SIGNUP_FAILURE,
    payload
  };
}


export default types;
