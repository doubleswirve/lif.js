// TODO: Rough sketch...
const STATECHANGE_EVENT = 'lif.statechange';
const statechange = new Event(STATECHANGE_EVENT);

class Store {
  get state () {
    return this._state;
  }

  constructor (initialState) {
    this._actions = {};
    this._initialState = initialState;
    this._state = initialState;
  }

  register (key, func) {
    this._actions[key] = func;
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

    dispatchEvent(statechange);
  }

  subscribe (func, context) {
    addEventListener(STATECHANGE_EVENT, func);
  }

  unsubscribe (func, context) {
    removeEventListener(STATECHANGE_EVENT, func);
  }
}

export default function (initialState) {
  return new Store(initialState);
};
