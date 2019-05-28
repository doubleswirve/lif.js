import {render} from './dom.js';
import Base from './base.js';
import {getNextState} from './helpers.js'

/**
 * @param {string}   name
 * @param {Function} component
 * @param {any}      initialState
 */
export default function (name, component, initialState) {
  customElements.define(name, class extends Base {
    get initialState () {
      return initialState;
    }

    constructor () {
      super();

      // HACK: Avoid setter method so render method is not triggered
      this._state = initialState;

      // Unwrap component function to get actual render function
      this._component = component(async (func, ...args) => {
        const ctx = {
          props: this._props,
          state: this._state
        };
        this.setState(await getNextState(func, ctx, args));
      });
    }

    render () {
      const res = this._component(this._props, this._state);
      render(res, this.shadowRoot);
    }
  });
};
