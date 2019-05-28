import { html, render } from '../../../lif/dom.js';
import stateful from '../../../lif/stateful.js';

const INITIAL_COUNT = 0;

function inc ({ state }) {
  return state + 1;
}

function dec ({ state }) {
  return state - 1;
}

function reset () {
  return INITIAL_COUNT;
}

stateful(
  'simple-counter',
  dispatch => (_, state) => {
    return html`
      <style>
        pre {
          font-family: Consolas, monospace;
          font-size: 2em;
        }

        .-negative {
          color: red;
        }
      </style>
      <h1>simple-counter</h1>
      <button @click=${() => dispatch(inc)}>
        +
      </button>
      <button @click=${() => dispatch(dec)}>
        -
      </button>
      <button @click=${() => dispatch(reset)}>
        reset
      </button>
      <pre class=${state < 0 ? '-negative' : ''}>
        (${state})
        ${[...Array(Math.abs(state)).keys()].map(_ => '*')}
      </pre
      >
    `;
  },
  INITIAL_COUNT
);

render(
  html`
    <simple-counter></simple-counter>
  `,
  document.getElementById('app')
);
