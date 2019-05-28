import store from './store.js';

export const increment = store.register('INC', ({ state }) => {
  return {
    count: state.count + 1
  };
});

export const decrement = store.register('DEC', ({ state }) => {
  return {
    count: state.count - 1
  };
});

export const changeType = store.register('TYP', (_, type) => {
  return {
    type
  };
});

export const reset = store.register('CKY', ({ initialState }) => {
  return initialState;
});
