import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../../node_modules/lit-html/directives/style-map.js';
import stateful from '../../../src/stateful.js';

// @see https://stackoverflow.com/a/1152508/1858091
function getRandomBackgroundColor () {
  return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

// @see https://stackoverflow.com/a/41491220/1858091
function getColor (backgroundColor) {
  const color = backgroundColor.substring(1);
  // hexTo{R,G,B}
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  if (r * 0.299 + g * 0.587 + b * 0.114 > 186) {
    return '#000000';
  }

  return '#ffffff';
}

function getStyle (backgroundColor) {
  return {
    backgroundColor,
    color: getColor(backgroundColor)
  };
}

let handle;

const lifecycle = {
  mounted ({ setState }) {
    console.log('MOUNTED', Date.now());

    handle = setInterval(
      () => {
        const date = new Date();

        setState(() => Object.assign(
          { date },
          date.getSeconds() % 2 === 0
            ? { style: getStyle(getRandomBackgroundColor()) }
            : {}
        ));
      },
      1e3
    );
  },

  destroyed () {
    clearInterval(handle);
  }
};

stateful(
  'simple-clock',
  dispatch => (_, { date, style }) => html`
    <style>
      div {
        box-sizing: border-box;
        display: block;
        font-family: Consolas, monospace;
        font-size: 1.3em;
        padding: 40px;
        text-align: center;
        text-transform: uppercase;
        transition: background-color 1s linear, color 1s linear;
        width: 100%;
      }
    </style>
    <h1>simple-clock</h1>
    <div style=${styleMap(style)}>${date.toString()}</div>
  `,
  { date: new Date(), style: getStyle(getRandomBackgroundColor()) },
  lifecycle
);

render(
  html`
    <simple-clock></simple-clock>
  `,
  document.getElementById('app')
);
