import sagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import {
  tasksFill, tasksFetching,
  taskCreateSuccess, taskCreating,
  taskEditSuccess, taskEditFailure, taskEditing
} from '../../actions/tasks';
import { tasks, taskCreate, taskEdit } from '../../api';
import { taskSchema, tasksSchema } from '../../api/schema';

import { fetchTasks, createTask, editTask } from '../tasks';


describe('`fetchTasks` Saga test', () => {
  const it = sagaHelper(fetchTasks());
  const response = { results: [{ id: 1, name: 'test' }] };

  it('change FETCH_STATE to `true`', (result) => {
    expect(result).toEqual(put(tasksFetching(true)));
  });

  it('call API', (result) => {
    expect(result).toEqual(call(tasks));
    return { response };
  });

  it('normalize response, then fill the tasks', (result) => {
    const normalizedData = normalize(response.results, tasksSchema);
    const payload = {
      ids: normalizedData.result,
      map: normalizedData.entities.tasks
    };
    expect(result).toEqual(put(tasksFill(payload)));
  });

  it('change FETCH_STATE to `false`', (result) => {
    expect(result).toEqual(put(tasksFetching(false)));
  });

  it('end.', (result) => {
    expect(result).toBeUndefined();
  });
});


describe('`createTask` Saga test', () => {
  const payload = { text: 'test task' };
  const it = sagaHelper(createTask({ payload }));
  const response = {
    assigned_to_user: null,
    completed_at: null,
    completed_by_user: null,
    completion_date: null,
    creator: {
      email: 'andrewwest@young.com',
      id: 43,
      name: 'Kelli Waters'
    },
    id: 190,
    is_completed: false,
    note: null,
    notification_date: null,
    task: {
      id: 70,
      name: 'test task'
    },
    text: 'test task'
  };

  it('change CREATE_STATE to `true`', (result) => {
    expect(result).toEqual(put(taskCreating(true)));
  });

  it('call API', (result) => {
    expect(result).toEqual(call(taskCreate, payload));
    return { response };
  });

  it('normalize response, then add task to state', (result) => {
    const { entities } = normalize(response, taskSchema);
    expect(result).toEqual(put(taskCreateSuccess(entities.tasks[response.id])));
  });

  it('change CREATE_STATE to `false`', (result) => {
    expect(result).toEqual(put(taskCreating(false)));
  });

  it('end.', (result) => {
    expect(result).toBeUndefined();
  });
});


describe('`editTask` Saga test', () => {
  describe('Scenario 1: Success task edit', () => {
    const id = 53;
    const payload = { text: 'test task 123' };
    const response = {
      id: 53,
      text: 'test task 123',
      creator: {
        id: 41,
        email: 'jacksonmark@mckee.com'
      }
    };
    const it = sagaHelper(editTask({ meta: { id }, payload }));

    it('change EDIT_STATE to `true`', (result) => {
      expect(result).toEqual(put(taskEditing(id, true)));
    });

    it('call API', (result) => {
      expect(result).toEqual(call(taskEdit, id, payload));
      return { response };
    });

    it('normalize response, then apply changes to state', (result) => {
      const { entities } = normalize(response, taskSchema);
      expect(result).toEqual(put(taskEditSuccess(id, entities.tasks[id])));
    });

    it('change EDIT_STATE to `false`', (result) => {
      expect(result).toEqual(put(taskEditing(id, false)));
    });

    it('end.', (result) => {
      expect(result).toBeUndefined();
    });
  });


  describe('Scenario 2: Failure task edit', () => {
    const id = 1111111;
    const payload = { text: 'test task 123' };
    const error = { error: 'Task not found.' };
    const it = sagaHelper(editTask({ meta: { id }, payload }));

    it('change EDIT_STATE to `true`', (result) => {
      expect(result).toEqual(put(taskEditing(id, true)));
    });

    it('call API', (result) => {
      expect(result).toEqual(call(taskEdit, id, payload));
      return { error };
    });

    it('fire `taskEditFailure` action', (result) => {
      expect(result).toEqual(put(taskEditFailure(id, error)));
    });

    it('change EDIT_STATE to `false`', (result) => {
      expect(result).toEqual(put(taskEditing(id, false)));
    });

    it('end.', (result) => {
      expect(result).toBeUndefined();
    });
  });
});
