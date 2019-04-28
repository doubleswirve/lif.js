import {html} from 'https://unpkg.com/lit-html?module';
import {stateless} from '../liff/liff.js';

function TodoItem (props) {
  return html`
    <li>
      <input
        .checked=${props.todo.completed}
        type="checkbox"
        @click=${() => props.toggleTodo(props.index)}
      >
      <span>
        ${props.todo.completed
          ? html`<strike>${props.todo.todo}</strike>`
          : props.todo.todo
        }
      </span>
      <button @click=${() => {
        props.removeTodo(props.index);
      }}>delete me</button>
    </li>
  `;
}

stateless('todo-item', TodoItem);
