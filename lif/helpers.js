/**
 * @param {any} maybeObj
 *
 * @returns {boolean}
 */
export function isObject (maybeObj) {
  const obj = {};
  return obj.toString.call(maybeObj) === '[object Object]';
}
