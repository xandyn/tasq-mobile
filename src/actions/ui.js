const types = {};


types.SELECT_PROJECT = 'ui/SELECT_PROJECT';
export function selectProject(payload) {
  return {
    type: types.SELECT_PROJECT,
    payload
  };
}

types.CLEAR_UI = 'users/CLEAR_UI';
export function uiClear() {
  return {
    type: types.CLEAR_UI
  };
}

export default types;
