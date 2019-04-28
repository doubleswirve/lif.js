import {html, render} from 'https://unpkg.com/lit-html?module';
import {stateless} from './liffick/liffick.js';
import './components/HelloMessage.js';
import './components/ButtonCounter.js';
import './components/ClockButton.js';

const AppContainer = props => html`
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
`;

stateless('app-container', AppContainer);

render(
  html`<app-container .Props=${null}></app-container>`,
  document.body
);
