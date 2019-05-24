import {render} from '../node_modules/lit-html/lit-html.js';
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
      const res = component(store)(this._props)
      render(res, this._shadowRoot);
    }
  });
};
