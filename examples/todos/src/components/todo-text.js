import { html } from '../../../../node_modules/lit-html/lit-html.js';
import stateless from '../../../../src/stateless.js';

const ENTER_KEY = 13;

stateless('todo-text', ({ text, placeholder = '', addTodo, setText }) => {
  return html`
    <style>
      :host {
        display: flex;
        justify-content: space-between;
      }

      input {
        flex: 1;
      }
    </style>
    <input
      .value=${text}
      @keyup=${
        e => {
          if (e.keyCode === ENTER_KEY && e.target.value) {
            addTodo(e.target.value);
          } else {
            setText(e.target.value);
          }
        }
      }
      placeholder=${placeholder}
      type="text"
    />
    <button ?disabled=${!text} @click=${() => addTodo(text)}>
      add me
    </button>
  `;
});
