import {getNextState, getState} from './helpers.js';

export default function (initialState) {
  let actions = {};
  let state = initialState;

  // Set up "unique" identifier for store instance
  // @see https://gist.github.com/gordonbrander/2230317
  const id = Math.random().toString(36).substr(2, 9);
  const eventName = `lif.store.${id}`;

  // Meat n' potatoes
  let store = {
    get eventName () {
      return eventName;
    },

    get id () {
      return id;
    },

    get initialState () {
      return initialState;
    },

    get state () {
      return state;
    },

    register (actionName, actionHandler) {
      actions[actionName] = actionHandler;

      return (...actionArgs) => {
        this.send(actionName, ...actionArgs);
      }
    },

    reset () {
      this.setState(initialState, 'lif.store.reset');
    },

    async send (actionName, ...args) {
      const actionHandler = actions[actionName];
      const nextState = await getNextState(actionHandler, this, args);
      this.setState(nextState, actionName, args);
    },

    setState (nextState, actionName, args) {
      state = getState(state, nextState);

      // Use built-in event system
      // @see https://gist.github.com/anasnakawa/9205494
      const e = new CustomEvent(eventName, {
        detail: {
          actionName,
          args
        }
      });

      dispatchEvent(e);
    },

    subscribe (storeListener) {
      addEventListener(eventName, storeListener);
    },

    unsubscribe (storeListener) {
      removeEventListener(eventName, storeListener);
    }
  };

  // Bind context for store functions
  const proto = Object.getPrototypeOf(store);

  Object.getOwnPropertyNames(proto).forEach(funcName => {
    if (typeof store[funcName] === 'function') {
      store[funcName] = store[funcName].bind(store);
    }
  });

  return store;
};
