import { render } from './dom.js';
import Base from './base.js';
import { getNextState, getState } from './helpers.js';

/**
 * @param {string}   name
 * @param {Function} component
 * @param {any}      initialState
 */
export default function (name, component, initialState, lifecycle = {}) {
  customElements.define(
    name,
    class extends Base {
      get initialState () {
        return initialState;
      }

      constructor () {
        super();
        this.lifecycle = lifecycle;
        // HACK: Avoid setter method so render method is not triggered
        this.state = initialState;
        // Bind methods to instance that will be passed to dispatchers
        this.setState = this.setState.bind(this);
        // Unwrap component function to get actual render function
        this._component = component(async (func, ...args) => {
          const { initialState, props, state, setState } = this;
          const ctx = {
            initialState,
            props,
            state,
            setState
          };
          setState(await getNextState(func, ctx, args));
        });
      }

      getLifecycleArgs () {
        return [this.shadowRoot, this.props, this.state, this.setState];
      }

      render () {
        const res = this._component(this.props, this.state);
        render(res, this.shadowRoot);
      }

      setState (nextState) {
        this.state = getState(this.state, nextState);
        this.doRender();
      }
    }
  );
}
