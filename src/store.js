import { getNextState, getState, iterFuncProps } from './helpers.js';

export default function (initialState) {
  // Pub/sub via https://gist.github.com/developit/55c48d294abab13a146eac236bae3219
  let listeners = [];
  let state = initialState;

  let store = {
    get initialState () {
      return initialState;
    },

    get state () {
      return state;
    },

    bindActions (actions) {
      return iterFuncProps(actions(this), (obj, name, func) => {
        obj[name] = ((...args) => this.send(func, ...args)).bind(this);
      });
    },

    async send (func, ...args) {
      const nextState = await getNextState(func, state, args);
      this.setState(() => nextState);
    },

    setState (func) {
      const prevState = state;
      const nextState = func(state);
      state = getState(prevState, nextState);
      listeners.forEach(func => func(prevState, nextState));
    },

    subscribe (func) {
      listeners.push(func);
    },

    unsubscribe (func) {
      const index = listeners.indexOf(func);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  };

  return iterFuncProps(store, (obj, name, func) => {
    obj[name] = obj[name].bind(obj);
  });
}
