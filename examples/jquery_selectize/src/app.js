import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import stateful from '../../../src/stateful.js';

function loadOptions () {
  return [
    { value: 1, text: 'canada' },
    { value: 2, text: 'usa' },
    { value: 3, text: 'mexico' }
  ];
}

stateful(
  'jquery-selectize',
  dispatch => (_, state) => html`
    <style>
      @import url(./vendor/selectize.css);

      select {
        font-family: Consolas, monospace;
      }
    </style>
    <h1>jquery-selectize</h1>
    <button @click=${() => dispatch(loadOptions)}>load options</button>
    <code>${state.length} options currently</code>
    <div>
      <select .disabled=${state.length < 1}></select>
    </div>
  `,
  [],
  {
    mounted ({ shadowRoot, state }) {
      const select = $(shadowRoot)
        .find('select')
        .selectize();
    },

    updated ({ shadowRoot, state }) {
      const select = $(shadowRoot).find('select')[0];
      state.forEach(({ value, text }) => {
        select.selectize.addOption({ value, text });
        select.selectize.addItem(value);
      });

      if (state.length > 0) {
        select.selectize.enable();
      } else {
        select.selectize.disable();
      }
    }
  }
);

render(
  html`
    <jquery-selectize></jquery-selectize>
  `,
  document.getElementById('app')
);
