// @see https://github.com/claudiopro/react-fiber-vs-stack-demo
import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import './components/the-app.js';

const container = document.getElementById('app');
const start = Date.now();

function app () {
  const props = {
    elapsed: Date.now() - start
  };

  return html`
    <the-app .props=${props}></the-app>
  `;
}

function update () {
  render(app(), container);
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
