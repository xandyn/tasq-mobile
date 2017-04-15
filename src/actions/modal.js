const types = {};


types.OPEN_MODAL = 'modal/OPEN_MODAL';
export function modalOpen(name, payload = {}) {
  return {
    type: types.OPEN_MODAL,
    payload,
    meta: { name }
  };
}

types.CLOSE_MODAL = 'modal/CLOSE_MODAL';
export function modalClose() {
  return {
    type: types.CLOSE_MODAL
  };
}

export default types;
