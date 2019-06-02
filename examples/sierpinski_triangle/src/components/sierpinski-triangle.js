import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../../../node_modules/lit-html/directives/style-map.js';
import stateless from '../../../../src/stateless.js';
import './the-dot.js';

function theDot ({ seconds, targetSize, x, y }) {
  const size = targetSize * 1.3;
  const props = {
    size,
    text: seconds
  };
  const style = styleMap({
    height: `${size}px`,
    left: `${x - targetSize / 2}px`,
    top: `${y - targetSize / 2}px`,
    width: `${size}px`
  });

  return html`
    <style>
      the-dot {
        position: absolute;
      }
    </style>
    <the-dot .props=${props} style=${style}></the-dot>
  `;
}

function theTriangle ({ moreWork, seconds, size, targetSize, x, y }) {
  if (moreWork) {
    const delay = performance.now() + 0.8;

    while (performance.now() < delay) {
      // Artificially long execution time
    }
  }

  const newSize = size / 2;
  const partialProps = [
    { x, y: y - newSize / 2 },
    { x: x - newSize, y: y + newSize / 2 },
    { x: x + newSize, y: y + newSize / 2 }
  ];

  return html`
    ${
      partialProps.map(({ x, y }) => {
        const props = {
          moreWork,
          seconds,
          size: newSize,
          targetSize,
          x,
          y
        };

        return html`
          <sierpinski-triangle .props=${props}></sierpinski-triangle>
        `;
      })
    }
  `;
}

function sierpinskiTriangle (props) {
  return html`
    ${props.size <= props.targetSize ? theDot(props) : theTriangle(props)}
  `;
}

stateless('sierpinski-triangle', sierpinskiTriangle);
