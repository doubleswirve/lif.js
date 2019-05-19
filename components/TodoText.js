import {html} from 'https://unpkg.com/lit-html?module';
import {stateless} from '../lif/lif.js';

function TodoText (props) {
  return html`
    <div>
      <input
        @keyup=${e => {
          const {value} = e.target;

          if (e.keyCode === 13 && value) {
            props.addTodo(value);
          } else {
            props.setText(value);
          }
        }}
        id="A"
        type="text"
        .value=${props.text}
        placeholder=${props.placeholder || ''}
      >
      <button
        ?disabled=${!props.text}
        @click=${() => {
          props.addTodo(props.text);
        }}
      >Add</button>
    </div>
  `;
}

stateless('todo-text', TodoText);
