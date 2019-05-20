import {html} from 'https://unpkg.com/lit-html?module';
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
