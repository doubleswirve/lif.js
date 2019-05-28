import { render } from './dom.js';
import Base from './base.js';

/**
 * @param {string}   name
 * @param {Function} component
 * @param {Object}   store
 */
export default function (name, component, store, lifecycle = {}) {
  customElements.define(
    name,
    class extends Base {
      constructor () {
        super();
        this.lifecycle = lifecycle;
        store.subscribe(this.doRender.bind(this));
        this.doLifecycleFunc('created');
      }

      getLifecycleArgs () {
        const { props, shadowRoot } = this;
        return { props, shadowRoot };
      }

      render () {
        const res = component(store)(this.props);
        render(res, this.shadowRoot);
      }
    }
  );
}
