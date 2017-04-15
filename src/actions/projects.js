const types = {};


types.FILL_PROJECTS = 'projects/FILL_PROJECTS';
export function projectsFill(payload) {
  return {
    type: types.FILL_PROJECTS,
    payload
  };
}

types.CLEAR_PROJECTS = 'projects/CLEAR_PROJECTS';
export function projectsClear() {
  return {
    type: types.CLEAR_PROJECTS
  };
}

types.FETCH_PROJECTS = 'projects/FETCH_PROJECTS';
export function projectsFetch(payload) {
  return {
    type: types.FETCH_PROJECTS,
    payload
  };
}

types.FETCH_PROJECTS_STATE = 'projects/FETCH_PROJECTS_STATE';
export function projectsFetching(payload) {
  return {
    type: types.FETCH_PROJECTS_STATE,
    payload
  };
}


types.CREATE_PROJECT_REQUEST = 'projects/CREATE_PROJECT_REQUEST';
export function projectCreateRequest(payload) {
  return {
    type: types.CREATE_PROJECT_REQUEST,
    payload
  };
}

types.CREATE_PROJECT_SUCCESS = 'projects/CREATE_PROJECT_SUCCESS';
export function projectCreateSuccess(payload) {
  return {
    type: types.CREATE_PROJECT_SUCCESS,
    payload
  };
}

types.CREATE_PROJECT_FAILURE = 'projects/CREATE_PROJECT_FAILURE';
export function projectCreateFailure(payload) {
  return {
    type: types.CREATE_PROJECT_FAILURE,
    payload
  };
}

types.CREATE_PROJECT_STATE = 'projects/CREATE_PROJECT_STATE';
export function projectCreating(payload) {
  return {
    type: types.CREATE_PROJECT_STATE,
    payload
  };
}


types.EDIT_PROJECT_REQUEST = 'projects/EDIT_PROJECT_REQUEST';
export function projectEditRequest(id, payload) {
  return {
    type: types.EDIT_PROJECT_REQUEST,
    meta: { id },
    payload
  };
}

types.EDIT_PROJECT_SUCCESS = 'projects/EDIT_PROJECT_SUCCESS';
export function projectEditSuccess(id, payload) {
  return {
    type: types.EDIT_PROJECT_SUCCESS,
    meta: { id },
    payload
  };
}

types.EDIT_PROJECT_FAILURE = 'projects/EDIT_PROJECT_FAILURE';
export function projectEditFailure(id, payload) {
  return {
    type: types.EDIT_PROJECT_FAILURE,
    meta: { id },
    payload
  };
}

types.EDIT_PROJECT_STATE = 'projects/EDIT_PROJECT_STATE';
export function projectEditing(id, payload) {
  return {
    type: types.EDIT_PROJECT_STATE,
    meta: { id },
    payload
  };
}

types.DELETE_PROJECT_REQUEST = 'projects/DELETE_PROJECT_REQUEST';
export function projectDeleteRequest(id) {
  return {
    type: types.DELETE_PROJECT_REQUEST,
    meta: { id }
  };
}

types.DELETE_PROJECT_SUCCESS = 'projects/DELETE_PROJECT_SUCCESS';
export function projectDeleteSuccess(id) {
  return {
    type: types.DELETE_PROJECT_SUCCESS,
    meta: { id }
  };
}

types.DELETE_PROJECT_FAILURE = 'projects/DELETE_PROJECT_FAILURE';
export function projectDeleteFailure(id) {
  return {
    type: types.DELETE_PROJECT_FAILURE,
    meta: { id }
  };
}

types.DELETE_PROJECT_STATE = 'projects/DELETE_PROJECT_STATE';
export function projectDeleting(id, payload) {
  return {
    type: types.DELETE_PROJECT_STATE,
    payload,
    meta: { id }
  };
}

export default types;
