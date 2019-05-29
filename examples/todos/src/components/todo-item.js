import { html } from '../../../../node_modules/lit-html/lit-html.js';
import stateless from '../../../../src/stateless.js';

stateless('todo-item', ({ todo, toggleTodo, removeTodo }) => {
  return html`
    <style>
      li {
        display: flex;
        justify-content: space-between;
      }

      li:hover {
        background-color: #f5f5f5;
      }

      label {
        cursor: pointer;
        flex: 1;
      }
    </style>
    <li>
      <label>
        <input
          .checked=${todo.completed}
          @click=${() => toggleTodo(todo)}
          type="checkbox"
        />
        ${
          todo.completed
            ? html`
                <strike>${todo.text}</strike>
              `
            : todo.text
        }
      </label>
      <button @click=${() => removeTodo(todo)}>
        delete me
      </button>
    </li>
  `;
});
