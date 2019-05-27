import {isObject} from './helpers.js';

export default function (initialState) {
  let _actions = {};
  let _state = initialState;

  // Set up "unique" identifier for store instance
  // @see https://gist.github.com/gordonbrander/2230317
  const id = Math.random().toString(36).substr(2, 9);
  const eventName = `lif.store.${id}`;

  // Meat n' potatoes
  let _store = {
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
      return _state;
    },

    register (actionName, actionHandler) {
      _actions[actionName] = actionHandler;

      return (...actionArgs) => {
        this.send(actionName, ...actionArgs);
      }
    },

    reset () {
      this.setState(initialState, 'lif.store.reset');
    },

    async send (actionName, ...actionArgs) {
      const actionHandler = _actions[actionName];
      const nextState = await actionHandler(this, ...actionArgs);
      this.setState(nextState, actionName, ...actionArgs);
    },

    setState (nextState, actionName, ...actionArgs) {
      if (isObject(_state)) {
        Object.assign(_state, nextState);
      } else {
        _state = nextState;
      }

      // Use built-in event system
      // @see https://gist.github.com/anasnakawa/9205494
      const e = new CustomEvent(eventName, {
        detail: {actionName, actionArgs}
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
  const proto = Object.getPrototypeOf(_store);

  Object.getOwnPropertyNames(proto).forEach(funcName => {
    if (typeof _store[funcName] === 'function') {
      _store[funcName] = _store[funcName].bind(_store);
    }
  });

  return _store;
};
