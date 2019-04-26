import {html, render} from 'https://unpkg.com/lit-html?module';

function increment (state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve({
          ...state,
          count: state.count + 1,
          err: null
        });
      } else {
        reject({
          ...state,
          err: 'A random error has occurred...'
        });
      }
    }, 1e3);
  });
}

function disable (state) {
  return {
    ...state,
    disabled: true
  };
}

function enable (state) {
  return {
    ...state,
    disabled: false
  };
}

function MyElementWrapped (dispatch) {
  return function MyElement (state) {
    return html`
      <style>
        .err {
          color: red;
        }
      </style>
      ${state.err && html`<p class="err">${state.err}</p>`}
      <button
        ?disabled=${state.disabled || false}
        @click=${e => {
          e.preventDefault();

          dispatch(
            enable,
            dispatch(
              increment,
              dispatch(disable, state)
            )
          );
        }}
      >
        Count ${state.count}
      </button>
      ${state.count && state.count > 0 && html`
        <ul>
          ${[...Array(state.count).keys()].map((_, index) => {
            return html`
              <li>index = ${index}</li>
            `;
          })}
        </ul>
      `}
    `;
  };
}

//
function liffick (name, wrapped) {
  function connect (state, shadowRoot) {
    async function dispatch (func, state) {
      try {
        const nextState = await func(await state);

        render(component(nextState), shadowRoot);

        return nextState;
      } catch (err) {
        render(component(err), shadowRoot);

        return err;
      }
    }

    const component = wrapped(dispatch);

    dispatch(_ => _, state);
  }

  customElements.define(name, class extends HTMLElement {
    set State (state) {
      connect(state, this.attachShadow({mode: 'open'}));
    }
  });
}

//
liffick('my-element', MyElementWrapped);

render(
  html`
    <h1>Hi, you</h1>
    <br>
    <my-element .State=${{count: 1}}></my-element>
    <br>
    <my-element .State=${{count: 10}}></my-element>
  `,
  document.body
);
