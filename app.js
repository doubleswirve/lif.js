import {html, render} from 'https://unpkg.com/lit-html?module';
import {stateless} from './lif/lif.js';
import './components/HelloMessage.js';
import './components/ButtonCounter.js';
import './components/ClockButton.js';
import './components/TodoApp.js';

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
    <todo-app .Props=${null}></todo-app>
  </div>
`;

stateless('app-container', AppContainer);

render(
  html`<app-container .Props=${null}></app-container>`,
  document.body
);
