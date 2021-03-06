import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import stateful from '../../../src/stateful.js';

function preFetchItems () {
  return {
    err: '',
    items: [],
    pending: true
  };
}

function postFetchItems () {
  return {
    pending: false
  };
}

async function fetchItems () {
  try {
    const res = await fetch('./data/items.json');

    if (!res.ok) {
      throw new Error(`rejected with status ${res.status}`);
    }

    const items = await res.json();
    return { items };
  } catch (err) {
    return { err };
  }
}

stateful(
  'simple-fetch',
  dispatch => (_, { err, items, pending }) => html`
    <style>
      ul {
        list-style: none;
        padding: 0;
      }

      li {
        border: 1px dotted #f3f3f3;
      }

      li:hover {
        background-color: red;
        border: 1px dotted blue;
      }
    </style>
    <h1>simple-fetch</h1>
    <button
      .disabled=${pending}
      @click=${
        async () => {
          dispatch(preFetchItems);
          await dispatch(fetchItems);
          dispatch(postFetchItems);
        }
      }
    >
      load items
    </button>
    ${
      pending
        ? html`
            <p>loading&hellip;</p>
          `
        : ''
    }
    ${
      err
        ? html`
            <p>${err}</p>
          `
        : ''
    }
    ${
      !err && items
        ? html`
            <ul>
              ${
                items.map(
                  ({ by, title, year }) => html`
                    <li>
                      <h4>${title}</h4>
                      ${
                        by.length < 1
                          ? ''
                          : by.map((author, index) => {
                              const pre = index === 0 ? '' : ', ';
                              return html`
                                ${pre}<span>${author}</span>
                              `;
                            })
                      }
                      <span>${year}</span>
                    </li>
                  `
                )
              }
            </ul>
          `
        : html`
            <p>no items; click to load data</p>
          `
    }
  `,
  { err: '', items: [], pending: false }
);

render(
  html`
    <simple-fetch></simple-fetch>
  `,
  document.getElementById('app')
);
