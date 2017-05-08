import { call, put, takeLatest } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import types, {
  projectsFill, projectsFetching,
  projectCreateSuccess,
  projectEditSuccess, projectEditFailure,
  projectDeleteSuccess, projectDeleteFailure,
} from '../actions/projects';
import { usersFill } from '../actions/users';
import { projects, projectCreate, projectEdit, projectDelete } from '../api';
import { projectSchema, projectsSchema } from '../api/schema';
import NavigationActions from '../navigation';


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
  yield call(NavigationActions.showSpinner);
  const { response } = yield call(projectCreate, payload);

  if (response) {
    const { entities } = normalize(response, projectSchema);
    yield put(projectCreateSuccess(entities.projects[response.id]));
    yield call(NavigationActions.dismissModal);
  }
  yield call(NavigationActions.hideSpinner);
}


export function* editProject({ meta: { id }, payload }) {
  yield call(NavigationActions.showSpinner);
  const { response, error } = yield call(projectEdit, id, payload);

  if (response) {
    const { entities } = normalize(response, projectSchema);
    yield put(projectEditSuccess(id, entities.projects[id]));
    yield call(NavigationActions.pop);
  } else {
    yield put(projectEditFailure(id, error));
  }
  yield call(NavigationActions.hideSpinner);
}


export function* deleteProject({ meta: { id } }) {
  yield call(NavigationActions.showSpinner);
  const { response } = yield call(projectDelete, id);
  yield call(NavigationActions.hideSpinner);
  if (response) {
    yield put(projectDeleteSuccess(id));
    yield call(NavigationActions.popToRoot);
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
