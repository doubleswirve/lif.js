import { render } from '../node_modules/lit-html/lit-html.js';
import Base from './base.js';

export default function (name, component, {store, actions, mapFunc}, lifecycle = {}) {
  const funcs = actions ? store.bindActions(actions) : {};
  const mapState = mapFunc ? mapFunc : () => ({});

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
        const state = mapState(store.state);
        const props = Object.assign({}, funcs, state, this.props);
        const res = component(props);
        render(res, this.shadowRoot);
      }
    }
  );
}
