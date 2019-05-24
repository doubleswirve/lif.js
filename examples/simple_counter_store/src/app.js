import {html, render} from '../../../node_modules/lit-html/lit-html.js';
import createStore from '../../../lif/store.js';
import connect from '../../../lif/stateless_store.js';

let store = createStore({count: 10, type: 'DEC'});

store.register('INC', ({state}) => ({count: state.count + 1}));
store.register('DEC', ({state}) => ({count: state.count - 1}));
store.register('TYP', (_, type) => ({type}));

connect(
  'counter-buttons',
  ({reset, send}) => _ => html`
    <button
      @click=${() => send('INC')}
    >
      inc
    </button>
    <button
      @click=${() => send('DEC')}
    >
      dec
    </button>
    <button
      @click=${() => reset()}
    >
      reset
    </button>
  `,
  store
);

connect(
  'counter-display-type',
  ({send, state}) => _ => html`
    <select
      @change=${e => send('TYP', e.target.value)}
    >
      ${['DEC', 'BIN'].map(type => html`
        <option
          .selected=${state.type === type}
          value=${type}
        >
          ${type}
        </option>
      `)}
    </select>
  `,
  store
);

function display ({count, type}) {
  switch (type) {
    case 'BIN':
      // @see https://stackoverflow.com/a/16155417/1858091
      return (count >>> 0).toString(2);
    case 'DEC':
      return count;
    default:
      return 'N/A';
  }
}

connect(
  'counter-display',
  ({state}) => _ => html`
    <style>
      code {
        font-family: Consolas, monospace;
        font-size: 2em;
      }
    </style>
    <code>(${display(state)})</code>
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
