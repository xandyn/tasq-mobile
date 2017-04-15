import { combineReducers } from 'redux';
import { Map, fromJS } from 'immutable';

import types from '../actions/profile';


function data(state = new Map(), action) {
  switch (action.type) {
    case types.FILL_PROFILE:
      return fromJS(action.payload);
    case types.CLEAR_PROFILE:
      return new Map();
    default:
      return state;
  }
}

function meta(state = new Map({ fetching: false, filled: false }), action) {
  switch (action.type) {
    case types.FETCH_PROFILE_STATE:
      return state.set('fetching', action.payload);
    case types.FILL_PROFILE:
      return state.set('filled', true);
    case types.CLEAR_PROFILE:
      return new Map({ fetching: false, filled: false });
    default:
      return state;
  }
}

export default combineReducers({
  data,
  meta
});
