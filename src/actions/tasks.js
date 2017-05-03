const types = {};


types.FILL_TASKS = 'tasks/FILL_TASKS';
export function tasksFill(payload) {
  return {
    type: types.FILL_TASKS,
    payload
  };
}

types.CLEAR_TASKS = 'tasks/CLEAR_TASKS';
export function tasksClear() {
  return {
    type: types.CLEAR_TASKS
  };
}

types.SEARCH_TASKS = 'tasks/SEARCH_TASKS';
export function tasksSearch(payload) {
  return {
    type: types.SEARCH_TASKS,
    payload
  };
}

types.FETCH_TASKS = 'tasks/FETCH_TASKS';
export function tasksFetch(payload) {
  return {
    type: types.FETCH_TASKS,
    payload
  };
}

types.FETCH_TASKS_STATE = 'tasks/FETCH_TASKS_STATE';
export function tasksFetching(payload) {
  return {
    type: types.FETCH_TASKS_STATE,
    payload
  };
}

types.CREATE_TASK_REQUEST = 'tasks/CREATE_TASK_REQUEST';
export function taskCreateRequest(payload) {
  return {
    type: types.CREATE_TASK_REQUEST,
    payload
  };
}

types.CREATE_TASK_SUCCESS = 'tasks/CREATE_TASK_SUCCESS';
export function taskCreateSuccess(payload) {
  return {
    type: types.CREATE_TASK_SUCCESS,
    payload
  };
}

types.CREATE_TASK_FAILURE = 'tasks/CREATE_TASK_FAILURE';
export function taskCreateFailure(payload) {
  return {
    type: types.CREATE_TASK_FAILURE,
    payload
  };
}


types.CREATE_TASK_STATE = 'tasks/CREATE_TASK_STATE';
export function taskCreating(payload) {
  return {
    type: types.CREATE_TASK_STATE,
    payload
  };
}

types.EDIT_TASK_REQUEST = 'tasks/EDIT_TASK_REQUEST';
export function taskEditRequest(id, popScreen = false, payload) {
  return {
    type: types.EDIT_TASK_REQUEST,
    meta: { id, popScreen },
    payload
  };
}

types.EDIT_TASK_SUCCESS = 'tasks/EDIT_TASK_SUCCESS';
export function taskEditSuccess(id, payload) {
  return {
    type: types.EDIT_TASK_SUCCESS,
    meta: { id },
    payload
  };
}

types.EDIT_TASK_FAILURE = 'tasks/EDIT_TASK_FAILURE';
export function taskEditFailure(id, payload) {
  return {
    type: types.EDIT_TASK_FAILURE,
    meta: { id },
    payload
  };
}

types.EDIT_TASK_STATE = 'tasks/EDIT_TASK_STATE';
export function taskEditing(id, payload) {
  return {
    type: types.EDIT_TASK_STATE,
    meta: { id },
    payload
  };
}

types.DELETE_TASK_REQUEST = 'tasks/DELETE_TASK_REQUEST';
export function taskDeleteRequest(id, popScreen = false) {
  return {
    type: types.DELETE_TASK_REQUEST,
    meta: { id, popScreen }
  };
}

types.DELETE_TASK_SUCCESS = 'tasks/DELETE_TASK_SUCCESS';
export function taskDeleteSuccess(id) {
  return {
    type: types.DELETE_TASK_SUCCESS,
    meta: { id }
  };
}

types.DELETE_TASK_FAILURE = 'tasks/DELETE_TASK_FAILURE';
export function taskDeleteFailure(id) {
  return {
    type: types.DELETE_TASK_FAILURE,
    meta: { id }
  };
}

types.DELETE_TASK_STATE = 'tasks/DELETE_TASK_STATE';
export function taskDeleting(id, payload) {
  return {
    type: types.DELETE_TASK_STATE,
    payload,
    meta: { id }
  };
}

export default types;
