import {render} from './dom.js';
import Base from './base.js';

/**
 * @param {string}   name
 * @param {Function} component
 */
export default function (name, component) {
  customElements.define(name, class extends Base {
    render () {
      const res = component(this._props);
      render(res, this._shadowRoot);
    }
  });
};
