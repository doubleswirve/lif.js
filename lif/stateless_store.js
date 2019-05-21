import {render} from '../node_modules/lit-html/lit-html.js';
import Base from './base.js';

/**
 * @param {string}   name
 * @param {Function} component
 * @param {Store}    store
 */
export default function (name, component, store) {
  customElements.define(name, class extends Base {
    constructor () {
      super();

      this._component = component(store);

      store.subscribe(this.render.bind(this));
    }

    render () {
      const res = this._component(this._props, this._shadowRoot);
      render(res, this._shadowRoot);
    }
  });
};


// Anyway to re-use stateless class?

/*
picturing something like...

function MyStatelessStore (store) {
  return function (props) {
    return html`
      <button
        @click=${store.send('INC_COUNTER')}
      >
        {props.text}
      </button>
      <span>${store.state.count}</span>
    `;
  }
}

or...

function MyStatelessStore (props, store) {
  return html`
    <button
      @click=${store.send('INC_COUNTER')}
    >
      {props.text}
    </button>
    <span>${store.state.count}</span>
  `;
}

---


statelessStore('my-name', MyStatelessStore, myStore);

// Maybe subclass stateless.js class; then just hook into
// pub/sub on store instance, then trigger render method...
*/
