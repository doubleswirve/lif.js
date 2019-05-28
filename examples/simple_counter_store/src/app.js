import { html, render } from '../../../lif/dom.js';
import connect from '../../../lif/connect.js';
import store from './store.js';
import { increment, decrement, changeType, reset } from './actions.js';
import { displayByNumSys } from './utils.js';

connect(
  'counter-buttons',
  _ => _ => html`
    <button @click=${increment}>
      inc
    </button>
    <button @click=${decrement}>
      dec
    </button>
    <button @click=${reset}>
      reset
    </button>
  `,
  store
);

connect(
  'counter-display-type',
  ({ state }) => _ => html`
    <select @change=${e => changeType(e.target.value)}>
      ${
        ['DEC', 'BIN'].map(
          type => html`
            <option .selected=${state.type === type} value=${type}>
              ${type}
            </option>
          `
        )
      }
    </select>
  `,
  store
);

connect(
  'counter-display',
  ({ state }) => _ => html`
    <style>
      code,
      pre {
        font-family: Consolas, monospace;
        font-size: 2em;
      }
    </style>
    <code>(${displayByNumSys(state)})</code>
    <pre>${JSON.stringify(state, null, 2)}</pre>
  `,
  store
);

store.subscribe(() => {
  console.log(store.state);
});

render(
  html`
    <counter-buttons></counter-buttons>
    <counter-display-type></counter-display-type>
    <counter-display></counter-display>
  `,
  document.getElementById('app')
);
