import {html} from 'https://unpkg.com/lit-html?module';
import {stateful} from '../lif/lif.js';
import './StarCounter.js';

function inc (state) {
  return state + 1;
}

function dec (state) {
  return state > 0 ? state - 1 : 0;
}

const ButtonCounter = dispatch => (props, state) => {
  return html`
    <div>
      <p>${props.desc}</p>
      <button
        @click=${() => dispatch(inc, state)}
      >
        ${state} ${state === 1 ? 'time' : 'times'}
      </button>
      <button
        @click=${() => dispatch(dec, state)}
      >
        --
      </button>
      <div>
        ${[...Array(state).keys()].map(
          () => html`
            <star-counter
              .Props=${{
                toClickUponAStar () {
                  alert(`There are ${state} stars!`);
                }
              }}
            ></star-counter>
          `
        )}
      </div>
    </div>
  `;
};

stateful('button-counter', ButtonCounter, 0);
