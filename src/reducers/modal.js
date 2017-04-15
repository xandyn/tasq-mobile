import { combineReducers } from 'redux';
import { Map, fromJS } from 'immutable';

import types from '../actions/modal';


function data(state = new Map(), action) {
  switch (action.type) {
    case types.OPEN_MODAL:
      return fromJS(action.payload);
    case types.CLOSE_MODAL:
      return new Map();
    default:
      return state;
  }
}

function name(state = '', action) {
  switch (action.type) {
    case types.OPEN_MODAL:
      return action.meta.name;
    case types.CLOSE_MODAL:
      return '';
    default:
      return state;
  }
}

export default combineReducers({
  data,
  name
});
