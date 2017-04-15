import { call, put, takeLatest } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import types, {
  projectsFill, projectsFetching,
  projectCreateSuccess, projectCreating,
  projectEditSuccess, projectEditFailure, projectEditing,
  projectDeleteSuccess, projectDeleteFailure, projectDeleting,
} from '../actions/projects';
import { usersFill } from '../actions/users';
import { selectProject } from '../actions/ui';
import { modalClose } from '../actions/modal';
import { projects, projectCreate, projectEdit, projectDelete } from '../api';
import { projectSchema, projectsSchema } from '../api/schema';


export function* fetchProjects() {
  yield put(projectsFetching(true));
  const { response } = yield call(projects);

  if (response) {
    const normalizedData = normalize(response.results, projectsSchema);
    const payload = {
      ids: normalizedData.result,
      map: normalizedData.entities.projects
    };
    yield put(projectsFill(payload));
    yield put(usersFill({ map: normalizedData.entities.users }));
  }
  yield put(projectsFetching(false));
}


export function* createProject({ payload }) {
  yield put(projectCreating(true));
  const { response } = yield call(projectCreate, payload);

  if (response) {
    const { entities } = normalize(response, projectSchema);
    yield put(projectCreateSuccess(entities.projects[response.id]));
    yield put(selectProject(response.id));
    yield put(modalClose());
  }
  yield put(projectCreating(false));
}


export function* editProject({ meta: { id }, payload }) {
  yield put(projectEditing(id, true));
  const { response, error } = yield call(projectEdit, id, payload);

  if (response) {
    const { entities } = normalize(response, projectSchema);
    yield put(projectEditSuccess(id, entities.projects[id]));
  } else {
    yield put(projectEditFailure(id, error));
  }
  yield put(projectEditing(id, false));
}


export function* deleteProject({ meta: { id } }) {
  yield put(projectDeleting(id, true));
  const { response } = yield call(projectDelete, id);
  yield put(projectDeleting(id, false));
  yield put(modalClose());
  if (response) {
    yield put(selectProject(''));
    yield put(projectDeleteSuccess(id));
  } else {
    yield put(projectDeleteFailure(id));
  }
}


export function* watchFetchProjects() {
  yield takeLatest(types.FETCH_PROJECTS, fetchProjects);
}

export function* watchCreateProject() {
  yield takeLatest(types.CREATE_PROJECT_REQUEST, createProject);
}

export function* watchEditProject() {
  yield takeLatest(types.EDIT_PROJECT_REQUEST, editProject);
}

export function* watchDeleteProject() {
  yield takeLatest(types.DELETE_PROJECT_REQUEST, deleteProject);
}


export default [
  watchFetchProjects,
  watchCreateProject,
  watchEditProject,
  watchDeleteProject,
];
