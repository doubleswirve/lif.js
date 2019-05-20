import {html, render} from '../../../node_modules/lit-html/lit-html.js';
import stateful from '../../../lif/stateful.js';

const INITIAL_COUNT = 0;

function inc (state) {
  return state + 1;
}

function dec (state) {
  return state < 1 ? INITIAL_COUNT : state - 1;
}

function reset (_) {
  return INITIAL_COUNT;
}

stateful(
  'simple-counter',
  (dispatch) => (_, state) => {
    return html`
      <style>
        pre {
          font-family: Consolas, monospace;
          font-size: 2em;
        }
      </style>
      <h1>simple-counter</h1>
      <button
        @click=${() => dispatch(inc)}
      >
        +
      </button>
      <button
        @click=${() => dispatch(dec)}
      >
        -
      </button>
      <button
        @click=${() => dispatch(reset)}
      >
        reset
      </button>
      <pre>
        (${state})
        ${[...Array(state).keys()].map(_ => '*')}
      </pre>
    `;
  },
  INITIAL_COUNT
);

render(
  html`<simple-counter></simple-counter>`,
  document.getElementById('app')
);
