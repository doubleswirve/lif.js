import {html} from '../../../../lif/dom.js';
import stateless from '../../../../lif/stateless.js';

stateless('todo-item', ({todo, toggleTodo, removeTodo}) => {
  return html`
    <style>
      li {
        display: flex;
        justify-content: space-between;
      }

      label {
        cursor: pointer;
        flex: 1;
      }

      label:hover {
        background-color: #f5f5f5;
      }
    </style>
    <li>
      <label>
        <input
          .checked=${todo.completed}
          @click=${() => toggleTodo(todo)}
          type="checkbox"
        >
        ${todo.completed
          ? html`<strike>${todo.text}</strike>`
          : todo.text
        }
      </label>
      <button
        @click=${() => removeTodo(todo)}
      >
        delete me
      </button>
    </li>
  `;
});
