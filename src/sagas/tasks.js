import { call, put, takeLatest } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import types, {
  tasksFill, tasksFetching,
  taskCreateSuccess,
  taskEditSuccess, taskEditFailure,
  taskDeleteSuccess, taskDeleteFailure,
} from '../actions/tasks';
import { tasks, taskCreate, taskEdit, taskDelete } from '../api';
import { taskSchema, tasksSchema } from '../api/schema';
import NavigationActions from '../navigation';


export function* fetchTasks() {
  yield put(tasksFetching(true));
  const { response } = yield call(tasks);

  if (response) {
    const normalizedData = normalize(response.results, tasksSchema);
    const payload = {
      ids: normalizedData.result,
      map: normalizedData.entities.tasks
    };
    yield put(tasksFill(payload));
  }
  yield put(tasksFetching(false));
}


export function* createTask({ payload }) {
  yield call(NavigationActions.showSpinner);
  const { response } = yield call(taskCreate, payload);

  if (response) {
    const { entities } = normalize(response, taskSchema);
    yield put(taskCreateSuccess(entities.tasks[response.id]));
    yield call(NavigationActions.dismissModal);
  }
  yield call(NavigationActions.hideSpinner);
}


export function* editTask({ meta: { id, popScreen }, payload }) {
  yield call(NavigationActions.showSpinner);
  const { response, error } = yield call(taskEdit, id, payload);

  if (response) {
    const { entities } = normalize(response, taskSchema);
    yield put(taskEditSuccess(id, entities.tasks[id]));
    if (popScreen) yield call(NavigationActions.pop);
  } else {
    yield put(taskEditFailure(id, error));
  }
  yield call(NavigationActions.hideSpinner);
}


export function* deleteTask({ meta: { id, popScreen } }) {
  yield call(NavigationActions.showSpinner);
  const { response } = yield call(taskDelete, id);
  yield call(NavigationActions.hideSpinner);

  if (response) {
    yield put(taskDeleteSuccess(id));
    if (popScreen) yield call(NavigationActions.pop);
  } else {
    yield put(taskDeleteFailure(id));
  }
}


export function* watchFetchTasks() {
  yield takeLatest(types.FETCH_TASKS, fetchTasks);
}

export function* watchCreateTask() {
  yield takeLatest(types.CREATE_TASK_REQUEST, createTask);
}

export function* watchEditTask() {
  yield takeLatest(types.EDIT_TASK_REQUEST, editTask);
}

export function* watchDeleteTask() {
  yield takeLatest(types.DELETE_TASK_REQUEST, deleteTask);
}


export default [
  watchFetchTasks,
  watchCreateTask,
  watchEditTask,
  watchDeleteTask,
];
