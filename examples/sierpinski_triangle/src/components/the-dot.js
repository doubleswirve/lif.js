import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../../../node_modules/lit-html/directives/style-map.js';
import stateful from '../../../../src/stateful.js';

function mouseenter () {
  return {
    hover: true
  };
}

function mouseleave () {
  return {
    hover: false
  };
}

function theDot (dispatch) {
  return function ({ size, text }, { hover }) {
    const cls = hover ? '-hover' : '';
    const style = styleMap({
      fontSize: `${size / 2}px`,
      lineHeight: `${size}px`
    });

    return html`
      <style>
        div {
          background-color: #d75cf6;
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          font-family: Consolas, monospace;
          text-align: center;
          transition: background-color 0.1s linear;
        }

        div.-hover {
          background-color: #5cd0f6;
          box-shadow: 0 0 10px #fff;
        }
      </style>
      <div
        @mouseenter=${() => dispatch(mouseenter)}
        @mouseleave=${() => dispatch(mouseleave)}
        class=${cls}
        style=${style}
      >
        ${hover ? `~${text}~` : text}
      </div>
    `;
  };
}

stateful('the-dot', theDot, { hover: false });
