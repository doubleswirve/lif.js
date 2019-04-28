import {html} from 'https://unpkg.com/lit-html?module';
import {stateful} from '../liffick/liffick.js';
import './ButtonCounter.js';

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
