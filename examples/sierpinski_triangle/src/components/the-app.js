import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../../../node_modules/lit-html/directives/style-map.js';
import stateful from '../../../../src/stateful.js';
import './sierpinski-triangle.js';

function resetState ({ initialState }) {
  return initialState;
}

function toggleMoreWork ({ state }) {
  return {
    moreWork: !state.moreWork
  };
}

function updateSize (_, size) {
  return {
    size: parseInt(size)
  };
}

function updateTargetSize (_, targetSize) {
  return {
    targetSize: parseInt(targetSize)
  };
}

function theApp (dispatch) {
  return function ({ elapsed }, { moreWork, seconds, size, targetSize }) {
    const t = (elapsed / 1e3) % 10;
    const scale = 1 + (t < 5 ? 10 - t : t) / 10;
    const transform = `scaleX(${scale / 2.1}) scaleY(0.7) translateZ(0.1px)`;
    const style = styleMap({ transform });
    const props = {
      moreWork,
      seconds,
      size,
      targetSize,
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

        label {
          font-weight: bold;
        }

        .form-group {
          position: relative;
          z-index: 1;
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
      <p class="form-group">
        <label for="the-app-size">size:</label>
        <input
          .value=${size}
          @keyup=${e => dispatch(updateSize, e.target.value)}
          id="the-app-size"
          min="128"
          type="number"
        />
      </p>
      <p class="form-group">
        <label for="the-app-targetsize">target size:</label>
        <input
          .value=${targetSize}
          @keyup=${e => dispatch(updateTargetSize, e.target.value)}
          id="the-app-targetsize"
          min="2"
          max=${size / 3}
          type="number"
        />
      </p>
      <p class="form-group">
        <label for="the-app-targetsize">enable artificial work:</label>
        <input
          .checked=${moreWork}
          @click=${() => dispatch(toggleMoreWork)}
          type="checkbox"
        />
      </p>
      <p class="form-group">
        <button @click=${() => dispatch(resetState)}>
          reset
        </button>
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
          seconds: (seconds % 10) + 1
        })),
      1e3
    );
  },

  destroyed () {
    clearInterval(handle);
  }
};

const initialState = {
  moreWork: false,
  seconds: 0,
  size: 1000,
  targetSize: 25
};

stateful('the-app', theApp, initialState, lifecycle);
