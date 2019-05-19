import {render} from 'https://unpkg.com/lit-html?module';
import Base from './base.js';

/**
 * @param {string}   name
 * @param {Function} component
 */
export default function (name, component) {
  customElements.define(name, class extends Base {
    render () {
      const res = component(this._props, this._shadowRoot);
      render(res, this._shadowRoot);
    }
  });
};
