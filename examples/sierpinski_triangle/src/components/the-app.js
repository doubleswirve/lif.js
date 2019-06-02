import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../../../node_modules/lit-html/directives/style-map.js';
import stateful from '../../../../src/stateful.js';
import './sierpinski-triangle.js';

function theApp () {
  return function ({ elapsed }, { seconds }) {
    const t = (elapsed / 1e3) % 10;
    const scale = 1 + (t < 5 ? 10 - t : t) / 10;
    const transform = `scaleX(${scale / 2.1}) scaleY(0.5) translateZ(0.1px)`;
    const style = styleMap({ transform });
    const props = {
      seconds,
      size: 1024,
      x: 0,
      y: 0
    };

    return html`
      <style>
        div {
          background-color: #5cf6af;
          border-radius: 50%;
          height: 10px;
          left: calc(50% - 2.5px);
          position: absolute;
          top: calc(50% - 2.5px);
          transform-origin: 0 0;
          width: 10px;
        }
      </style>
      <h1>sierpinski-triangle</h1>
      <p>
        <a
          href="https://github.com/claudiopro/react-fiber-vs-stack-demo"
          target="_blank"
          >@see</a
        >
      </p>
      <div style=${style}>
        <sierpinski-triangle .props=${props}></sierpinski-triangle>
      </div>
    `;
  };
}

let handle;

const lifecycle = {
  mounted ({ setState }) {
    handle = setInterval(
      () =>
        setState(({ seconds }) => ({
          seconds: seconds >= 9 ? 0 : seconds + 1
        })),
      1e3
    );
  },

  destroyed () {
    clearInterval(handle);
  }
};

stateful('the-app', theApp, { seconds: 0 }, lifecycle);
