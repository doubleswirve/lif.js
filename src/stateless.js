import { render } from '../node_modules/lit-html/lit-html.js';
import Base from './base.js';

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
