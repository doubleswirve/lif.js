import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import stateless from '../../../src/stateless.js';
import connect from '../../../src/connect.js';
import store from './store.js';
import actions from './actions.js';
import { displayByNumSys } from './utils.js';

stateless('counter-buttons', ({decrement, increment, reset}) => html`
  <button @click=${increment}>
    inc++
  </button>
  <button @click=${decrement}>
    dec--
  </button>
  <button @click=${reset}>
    reset
  </button>
`);

stateless('counter-display-type', ({changeType, type}) => html`
  <select @change=${e => changeType(e.target.value)}>
    ${
      ['DEC', 'BIN'].map(
        t => html`
          <option .selected=${type === t} value=${t}>
            ${t}
          </option>
        `
      )
    }
  </select>
`);

stateless('counter-display', ({count, type}) => html`
  <style>
    code,
    pre {
      font-family: Consolas, monospace;
      font-size: 2em;
    }
  </style>
  <br>
  <code>(${displayByNumSys(count, type)})</code>
  <code>${type}::${count}</code>
`);

connect(
  'simple-counter-store',
  ({decrement, changeType, count, increment, reset, type}) =>
    html`
      <counter-buttons
        .props=${{decrement, increment, reset}}
      ></counter-buttons>
      <counter-display-type
        .props=${{changeType, type}}
      ></counter-display-type>
      <counter-display
        .props=${{count, type}}
      ></counter-display>
    `,
  {store, actions, mapFunc (state) {
    return state;
  }}
);

store.subscribe(console.log);

render(
  html`<simple-counter-store></simple-counter-store>`,
  document.getElementById('app')
);
