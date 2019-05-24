// TODO: Rough sketch...
class Store {
  get initialState () {
    return this._initialState;
  }

  get state () {
    return this._state;
  }

  constructor (initialState) {
    // @see https://gist.github.com/anasnakawa/9205494
    // @see https://gist.github.com/gordonbrander/2230317
    this._actions = {};
    this._id = `LIF.${Math.random().toString(36).substr(2, 9)}`;
    this._e = new Event(this._id);
    this._initialState = initialState;
    this._state = initialState;

    // Bind methods to this instance
    const proto = Object.getPrototypeOf(this);
    Object.getOwnPropertyNames(proto).forEach(func => {
      if (func !== 'constructor' && typeof this[func] === 'function') {
        this[func] = this[func].bind(this);
      }
    });
  }

  register (key, func) {
    this._actions[key] = func;

    // Allow for "actions" sorta...
    return (...args) => {
      this.send(key, ...args);
    };
  }

  reset () {
    this.setState(this._initialState);
  }

  // TODO:...
  async send (key, ...args) {
    if (!this._actions[key]) {
      return new Error(`${key} not found`);
    }

    this.setState(await this._actions[key](this, ...args));
  }

  setState (state) {
    if (
      this._state === undefined ||
      ({}).toString.call(state) !== '[object Object]'
    ) {
      this._state = state;
    } else {
      this._state = {
        ...this._state,
        ...state
      }
    }

    dispatchEvent(this._e);
  }

  subscribe (func, context) {
    addEventListener(this._id, func);
  }

  unsubscribe (func, context) {
    removeEventListener(this._id, func);
  }
}

export default function (initialState) {
  return new Store(initialState);
};
