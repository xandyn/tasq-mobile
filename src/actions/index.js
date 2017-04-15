const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';


export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => (
    { ...acc, [type]: `${base}_${type}` }
  ), {});
}


export function action(type, rest = {}) {
  return { type, ...rest };
}
