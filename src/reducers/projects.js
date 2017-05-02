import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';

import types from '../actions/projects';
import typesUsers from '../actions/users';


function allIds(state = new List(), action) {
  switch (action.type) {
    case types.FILL_PROJECTS:
      return fromJS(action.payload.ids);
    case types.CLEAR_PROJECTS:
      return new List();
    case types.CREATE_PROJECT_SUCCESS:
      return state.unshift(action.payload.id);
    case types.DELETE_PROJECT_SUCCESS:
      return state.filter(id => id !== +action.meta.id);
    default:
      return state;
  }
}

function byId(state = new Map(), action) {
  switch (action.type) {
    case types.FILL_PROJECTS:
      return fromJS(action.payload.map);
    case types.CLEAR_PROJECTS:
      return new Map();
    case types.CREATE_PROJECT_SUCCESS:
      return state.set(action.payload.id.toString(), fromJS(action.payload));
    case types.EDIT_PROJECT_SUCCESS:
      return state.update(action.meta.id.toString(), item => (item.merge(action.payload)));
    case types.EDIT_PROJECT_STATE:
      return state.update(
        action.meta.id.toString(),
        item => (item.setIn(['meta', 'editing'], action.payload))
      );
    case types.DELETE_PROJECT_STATE:
      return state.update(
        action.meta.id.toString(),
        item => (item.setIn(['meta', 'removing'], action.payload))
      );
    case typesUsers.ADD_USER_TO_PROJECT:
      return state.update(
        action.meta.id.toString(),
        item => item.update(
          action.payload.id ? 'collaborators' : 'pending_collaborators',
          collabs => collabs.push(action.payload.email)
        )
      );
    case typesUsers.REMOVE_USER_FROM_PROJECT:
      return state.update(
        action.meta.id.toString(),
        item => item.update(
          action.payload.id ? 'collaborators' : 'pending_collaborators',
          collabs => collabs.filter(email => email !== action.payload.email)
        )
      );
    default:
      return state;
  }
}

function meta(state = new Map({ fetching: false, creating: false }), action) {
  switch (action.type) {
    case types.FETCH_PROJECTS_STATE:
      return state.set('fetching', action.payload);
    case types.CREATE_PROJECT_STATE:
      return state.set('creating', action.payload);
    default:
      return state;
  }
}

export default combineReducers({
  allIds,
  byId,
  meta
});
