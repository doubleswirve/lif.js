export async function getNextState (func, ctx, args) {
  try {
    return await func(await ctx, ...args);
  } catch (err) {
    return await err;
  }
}

export function getState (state, nextState) {
  if (isObject(state) && isObject(nextState)) {
    return {
      ...state,
      ...nextState
    };
  }

  return nextState;
}

export function isObject (maybeObj) {
  const obj = {};
  return obj.toString.call(maybeObj) === '[object Object]';
}
