import sagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import {
  projectsFill, projectsFetching,
  projectCreateSuccess,
  projectEditSuccess, projectEditFailure,
} from '../../actions/projects';
import { usersFill } from '../../actions/users';
import { projects, projectCreate, projectEdit } from '../../api';
import { projectSchema, projectsSchema } from '../../api/schema';
import NavigationActions from '../../navigation';

import { fetchProjects, createProject, editProject } from '../projects';


describe('`fetchProjects` Saga test', () => {
  const it = sagaHelper(fetchProjects());
  const response = {
    results: [{
      collaborators: [{
        id: 44,
        email: 'djacobs@petersen.org'
      }],
      id: 53,
      name: 'temporibus',
      owner: {
        id: 41,
        email: 'jacksonmark@mckee.com'
      }
    }]
  };

  it('change FETCH_STATE to `true`', (result) => {
    expect(result).toEqual(put(projectsFetching(true)));
  });

  it('call API', (result) => {
    expect(result).toEqual(call(projects));
    return { response };
  });

  it('normalize response, then fill the projects', (result) => {
    const normalizedData = normalize(response.results, projectsSchema);
    const payload = {
      ids: normalizedData.result,
      map: normalizedData.entities.projects || []
    };
    expect(result).toEqual(put(projectsFill(payload)));
  });

  it('fill users', (result) => {
    const normalizedData = normalize(response.results, projectsSchema);
    const payload = {
      map: normalizedData.entities.users || []
    };
    expect(result).toEqual(put(usersFill(payload)));
  });

  it('change FETCH_STATE to `false`', (result) => {
    expect(result).toEqual(put(projectsFetching(false)));
  });

  it('end.', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('`createProject` Saga test', () => {
  const payload = { name: 'test project' };
  const it = sagaHelper(createProject({ payload }));
  const response = {
    collaborators: [],
    id: 53,
    name: 'temporibus',
    owner: {
      id: 41,
      email: 'jacksonmark@mckee.com'
    }
  };

  it('show spinner', (result) => {
    expect(result).toEqual(call(NavigationActions.showSpinner));
  });

  it('call API', (result) => {
    expect(result).toEqual(call(projectCreate, payload));
    return { response };
  });

  it('normalize response, then add project to state', (result) => {
    const { entities } = normalize(response, projectSchema);
    expect(result).toEqual(put(projectCreateSuccess(entities.projects[response.id])));
  });

  it('dismiss modal', (result) => {
    expect(result).toEqual(call(NavigationActions.dismissModal));
  });

  it('hide spinner', (result) => {
    expect(result).toEqual(call(NavigationActions.hideSpinner));
  });

  it('end.', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('`editProject` Saga test', () => {
  describe('Scenario 1: Success project edit', () => {
    const id = 53;
    const payload = { name: 'test project 123' };
    const response = {
      collaborators: [],
      id: 53,
      name: 'temporibus',
      owner: {
        id: 41,
        email: 'jacksonmark@mckee.com'
      }
    };
    const it = sagaHelper(editProject({ meta: { id }, payload }));

    it('show spinner', (result) => {
      expect(result).toEqual(call(NavigationActions.showSpinner));
    });

    it('call API', (result) => {
      expect(result).toEqual(call(projectEdit, id, payload));
      return { response };
    });

    it('normalize response, then apply changes to state', (result) => {
      const { entities } = normalize(response, projectSchema);
      expect(result).toEqual(put(projectEditSuccess(id, entities.projects[id])));
    });

    it('Navigate back', (result) => {
      expect(result).toEqual(call(NavigationActions.pop));
    });

    it('hide spinner', (result) => {
      expect(result).toEqual(call(NavigationActions.hideSpinner));
    });

    it('end.', (result) => {
      expect(result).toBeUndefined();
    });
  });


  describe('Scenario 2: Failure project edit', () => {
    const id = 1111111;
    const payload = { name: 'test project 123' };
    const error = { error: 'Project not found.' };
    const it = sagaHelper(editProject({ meta: { id }, payload }));

    it('show spinner', (result) => {
      expect(result).toEqual(call(NavigationActions.showSpinner));
    });

    it('call API', (result) => {
      expect(result).toEqual(call(projectEdit, id, payload));
      return { error };
    });

    it('fire `projectEditFailure` action', (result) => {
      expect(result).toEqual(put(projectEditFailure(id, error)));
    });

    it('hide spinner', (result) => {
      expect(result).toEqual(call(NavigationActions.hideSpinner));
    });

    it('end.', (result) => {
      expect(result).toBeUndefined();
    });
  });
});
