import {html, render} from 'https://unpkg.com/lit-html?module';
import './components/TodoApp.js';

render(
  html`<todo-app></todo-app>`,
  document.getElementById('app')
);
