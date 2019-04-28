import {html, render} from 'https://unpkg.com/lit-html?module';
import {stateful, stateless} from './liffick.js';

function StarCounter () {
  return html`
    <style>
      span {
        color: blue;
        margin-right: 2px;
      }
    </style>
    <span>*</span>
  `;
}

stateless('star-counter', StarCounter);

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
          () => html`<star-counter .Props=${null}></star-counter>`
        )}
      </div>
    </div>
  `;
};

stateful('button-counter', ButtonCounter, 0);

function tick (_) {
  return new Date();
}

const ClockButton = dispatch => (props, state) => {
  setTimeout(() => dispatch(tick, state), 1e3);

  const desc = `And, you\'ve clicked this puppy... ${state}`

  return html`
    <button-counter
      .Props=${{desc}}
    >
    </button-counter>
  `;
};

stateful('clock-button', ClockButton, tick());

const HelloMessage = props => {
  return html`
    <style>
      span {
        font-style: italic;
      }
    </style>
    <p>Hello, <span>${props.name}</span></p>
  `;
};

stateless('hello-message', HelloMessage);

render(
  html`
    <div>
      <hello-message
        .Props=${{name: 'Barnabee'}}
      ></hello-message>
      <button-counter
        .Props=${{desc: 'You\'ve clicked...'}}
      >
      </button-counter>
      <clock-button .Props=${null}></clock-button>
    </div>
  `,
  document.body
);
