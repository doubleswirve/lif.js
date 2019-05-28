import { render } from './dom.js';
import Base from './base.js';

/**
 * @param {string}   name
 * @param {Function} component
 */
export default function (name, component, lifecycle = {}) {
  customElements.define(
    name,
    class extends Base {
      constructor () {
        super();
        this.lifecycle = lifecycle;
        this.doLifecycleFunc('created');
      }

      getLifecycleArgs () {
        const { props, shadowRoot } = this;
        return { props, shadowRoot };
      }

      render () {
        const res = component(this.props);
        render(res, this.shadowRoot);
      }
    }
  );
}
