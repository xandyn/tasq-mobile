
/* eslint-disable func-names, import/prefer-default-export */
export function debounce(func, wait, immediate) {
  let timeout;
  return function (...a) {
    const context = this;
    const args = a;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
/* eslint-enable func-names, import/prefer-default-export */

