import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import './components/todo-app.js';

render(
  html`
    <todo-app></todo-app>
  `,
  document.getElementById('app')
);
