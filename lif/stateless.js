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
      }

      getLifecycleArgs () {
        return [this.shadowRoot, this.props];
      }

      render () {
        const res = component(this.props);
        render(res, this.shadowRoot);
      }
    }
  );
}
