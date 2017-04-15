import { call, put, takeLatest } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import types, {
  tasksFill, tasksFetching,
  taskCreateSuccess, taskCreating,
  taskEditSuccess, taskEditFailure, taskEditing,
  taskDeleteSuccess, taskDeleteFailure, taskDeleting
} from '../actions/tasks';
import { modalClose } from '../actions/modal';
import { tasks, taskCreate, taskEdit, taskDelete } from '../api';
import { taskSchema, tasksSchema } from '../api/schema';


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
  yield put(taskCreating(true));
  const { response } = yield call(taskCreate, payload);

  if (response) {
    const { entities } = normalize(response, taskSchema);
    yield put(taskCreateSuccess(entities.tasks[response.id]));
  }
  yield put(taskCreating(false));
}


export function* editTask({ meta: { id }, payload }) {
  yield put(taskEditing(id, true));
  const { response, error } = yield call(taskEdit, id, payload);

  if (response) {
    const { entities } = normalize(response, taskSchema);
    yield put(taskEditSuccess(id, entities.tasks[id]));
  } else {
    yield put(taskEditFailure(id, error));
  }
  yield put(taskEditing(id, false));
}


export function* deleteTask({ meta: { id } }) {
  yield put(taskDeleting(id, true));
  const { response } = yield call(taskDelete, id);
  yield put(taskDeleting(id, false));
  yield put(modalClose());

  if (response) {
    yield put(taskDeleteSuccess(id));
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
