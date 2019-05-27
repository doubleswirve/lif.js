import {render} from './dom.js';
import Base from './base.js';

/**
 * @param {Function} func
 * @param {Promise}  state
 * @param {any[]}    args
 */
async function getNextState (func, state, args) {
  try {
    return await func(await state, ...args);
  } catch (err) {
    return await err;
  }
}

/**
 * @param {string}   name
 * @param {Function} component
 * @param {any}      initialState
 */
export default function (name, component, initialState) {
  customElements.define(name, class extends Base {
    constructor () {
      super();

      // HACK: Avoid setter method so render method is not triggered
      this._state = initialState;

      // Unwrap component function to get actual render function
      this._component = component(async (func, ...args) => {
        this.setState(await getNextState(func, this._state, args));
      });
    }

    render () {
      const res = this._component(this._props, this._state);
      render(res, this._shadowRoot);
    }
  });
};
