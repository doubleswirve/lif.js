export async function getNextState (func, ctx, args) {
  try {
    return await func(await ctx, ...args);
  } catch (err) {
    return await err;
  }
}

export function getState (state, nextState) {
  if (isObject(state) && isObject(nextState)) {
    return Object.assign({}, state, nextState);
  }
  return nextState;
}

export function isObject (maybeObj) {
  const obj = {};
  return obj.toString.call(maybeObj) === '[object Object]';
}

export function iterFuncProps (obj, func) {
  Object.getOwnPropertyNames(obj).forEach(name => {
    if (typeof obj[name] === 'function') {
      func(obj, name, obj[name]);
    }
  });

  return obj;
}

// @see https://github.com/tkh44/shallow-compare
export function shallowDiffers (a, b) {
  // @see https://stackoverflow.com/a/31538091/1858091
  if (a !== Object(a)) {
    return a !== b;
  }

  for (let key in a) {
    if (!(key in b)) {
      return true;
    }
  }

  for (let key in b) {
    if (a[key] !== b[key]) {
      return true;
    }
  }

  return false;
}
