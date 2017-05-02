import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';

import types from '../actions/tasks';


function allIds(state = new List(), action) {
  switch (action.type) {
    case types.FILL_TASKS:
      return fromJS(action.payload.ids);
    case types.CLEAR_TASKS:
      return new List();
    case types.CREATE_TASK_SUCCESS:
      return state.unshift(action.payload.id);
    case types.DELETE_TASK_SUCCESS:
      return state.filter(id => id !== +action.meta.id);
    default:
      return state;
  }
}

function byId(state = new Map(), action) {
  switch (action.type) {
    case types.FILL_TASKS:
      return fromJS(action.payload.map);
    case types.CLEAR_TASKS:
      return new Map();
    case types.CREATE_TASK_SUCCESS:
      return state.set(action.payload.id.toString(), fromJS(action.payload));
    case types.EDIT_TASK_SUCCESS:
      return state.update(action.meta.id.toString(), item => (item.merge(action.payload)));
    case types.EDIT_TASK_STATE:
      return state.update(
        action.meta.id.toString(),
        item => (item.setIn(['meta', 'editing'], action.payload))
      );
    case types.DELETE_TASK_STATE:
      return state.update(
        action.meta.id.toString(),
        item => (item.setIn(['meta', 'removing'], action.payload))
      );
    default:
      return state;
  }
}

function meta(state = new Map({ fetching: false, creating: false, search: '' }), action) {
  switch (action.type) {
    case types.FETCH_TASKS_STATE:
      return state.set('fetching', action.payload);
    case types.CREATE_TASK_STATE:
      return state.set('creating', action.payload);
    case types.SEARCH_TASKS:
      return state.set('search', action.payload);
    default:
      return state;
  }
}

export default combineReducers({
  allIds,
  byId,
  meta
});
