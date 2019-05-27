import {html, render} from '../../../lif/dom.js';
import './components/TodoApp.js';

render(
  html`<todo-app></todo-app>`,
  document.getElementById('app')
);
