import {render} from './dom.js';
import Base from './base.js';

/**
 * @param {string}   name
 * @param {Function} component
 * @param {Object}   store
 */
export default function (name, component, store) {
  customElements.define(name, class extends Base {
    constructor () {
      super();
      store.subscribe(this.render.bind(this));
    }

    render () {
      const res = component(store)(this.props)
      render(res, this.shadowRoot);
    }
  });
};
