import { Record } from 'immutable';

import types from '../actions/ui';


const InitialState = new Record({
  selectedProjectId: '',
});

const initialState = new InitialState();


export default function ui(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_PROJECT:
      return state.set('selectedProjectId', action.payload.toString());
    case types.CLEAR_UI:
      return new InitialState();
    default:
      return state;
  }
}
