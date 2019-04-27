import {render} from 'https://unpkg.com/lit-html?module';

// Register dispatcher with stateful component
function connect (wrapped, el, initialState) {
  el._state = initialState;

  async function dispatch (func, state) {
    try {
      el._state = await func(await state);
    } catch (err) {
      el._state = err;
    }
    draw(el);
    return el._state;
  }

  return wrapped(dispatch);
}

function draw (el) {
  const result =
    el._component(el._props, el._state, el._shadowRoot);
  render(result, el._shadowRoot);
}

// Create component with internal state
export function stateful (name, wrapped, initialState = {}) {
  customElements.define(name, class extends HTMLElement {
    set Props (props) {
      this._props = props;
      draw(this);
    }

    constructor () {
      super();
      this._shadowRoot = this.attachShadow({mode: 'open'});
      this._component = connect(wrapped, this, initialState);
    }
  });
}

// Create stateless web component
export function stateless (name, component) {
  customElements.define(name, class extends HTMLElement {
    set Props (props) {
      const result = component(props, this._shadowRoot);
      render(result, this._shadowRoot);
    }

    constructor () {
      super();
      this._shadowRoot = this.attachShadow({mode: 'open'});
    }
  });
}
