// TODO: Rough sketch...

class Store {
  get state () {
    // Clone?
    return this._state;
  }

  constructor (initialState) {
  }

  registerAction (key, func) {
    // key should be unique to store instance
  }

  // Async?
  send (key, ...args) {
    const func = this._actions[key];
    func(this, ...args);
    // Error if key is not found...
  }

  // Async?
  setState (state) {
    if (this._state === undefined) {
      this._state = state;
    }
    // ...
    // Check if object-esque; do a merge
    // Array?
    // Primitive?
  }
}
