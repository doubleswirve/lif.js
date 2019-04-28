import {render} from 'https://unpkg.com/lit-html?module';

async function getNextState (func, state) {
  try {
    return await func(await state);
  } catch (err) {
    return await err;
  }
}

function getPropsHandler (wrapped, container, initialState) {
  let _props;
  let _state = initialState;

  const component = wrapped(async (func, state) => {
    _state = await getNextState(func, state);

    const res = component(_props, _state);
    render(res, container);

    return _state;
  });

  return function (props) {
    _props = props;

    const res = component(_props, _state);
    render(res, container);
  };
}

// Create component with internal state
export function stateful (name, wrapped, initialState) {
  customElements.define(name, class extends HTMLElement {
    set Props (props) {
      this._propsHandler(props);
    }

    constructor () {
      super();
      this._propsHandler = getPropsHandler(
        wrapped,
        this.attachShadow({mode: 'open'}),
        initialState
      );
    }
  });
}

// Create stateless web component
export function stateless (name, component) {
  customElements.define(name, class extends HTMLElement {
    set Props (props) {
      const res = component(props);
      render(res, this._shadowRoot);
    }

    constructor () {
      super();
      this._shadowRoot = this.attachShadow({mode: 'open'});
    }
  });
}
