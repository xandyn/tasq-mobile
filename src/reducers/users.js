import { combineReducers } from 'redux';
import { Map, fromJS } from 'immutable';

import types from '../actions/users';


function byId(state = new Map(), action) {
  switch (action.type) {
    case types.FILL_USERS:
      return fromJS(action.payload.map);
    case types.CLEAR_USERS:
      return new Map();
    case types.ADD_USER:
      return state.set(action.payload.email, fromJS(action.payload));
    case types.REMOVE_USER:
      return state.delete(action.payload.email);
    case types.REMOVE_USER_STATE:
      return state.update(
        action.meta.id.toString(),
        item => (item.setIn(['meta', 'removing'], action.payload))
      );
    default:
      return state;
  }
}

function meta(state = new Map(), action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  meta
});
