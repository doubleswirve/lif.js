import {html} from '../../../../lif/dom.js';
import stateful from '../../../../lif/stateful.js';
import './TodoItem.js';
import './TodoText.js';

function addTodo (state, text) {
  return {
    text: '',
    todos: state.todos.concat({
      completed: false,
      id: `${state.todos.length}-${Date.now()}`,
      text
    })
  };
}

function clearTodos (state) {
  return {
    todos: []
  };
}

function getTodoIndex (todos, todo) {
  return todos.findIndex(({id}) => id === todo.id);
}

function removeTodo (state, todo) {
  const index = getTodoIndex(state.todos, todo);

  return {
    todos: state.todos
      .slice(0, index)
      .concat(state.todos.slice(index + 1))
  };
}

function setText (state, text) {
  return {
    text
  };
}

function toggleTodo (state, todo) {
  const index = getTodoIndex(state.todos, todo);

  return {
    todos: state.todos
      .slice(0, index)
      .concat(
        {
          ...todo,
          completed: !todo.completed
        },
        state.todos.slice(index + 1)
      )
  };
}

stateful(
  'todo-app',
  (dispatch) => {
    return (_, {text, todos}) => {
      return html`
        <style>
            ul {
              list-style: none;
              margin: 0;
              padding: 0;
            }
        </style>
        <h1>todo-app</h1>
        <todo-text
          .props=${{
            placeholder: 'Type a todo and hit enter...',
            text,
            addTodo (text) {
              dispatch(addTodo, text);
            },
            setText (text) {
              dispatch(setText, text);
            }
          }}
        ></todo-text>
        ${todos.length < 1
          ? ''
          : html`
            <button
              @click=${() => dispatch(clearTodos)}
            >
              clear all
            </button>
            <ul>
              ${todos.map(
                todo =>
                  html`
                    <todo-item
                      .props=${{
                        todo,
                        removeTodo (todo) {
                          dispatch(removeTodo, todo);
                        },
                        toggleTodo (todo) {
                          dispatch(toggleTodo, todo);
                        }
                      }}
                    >
                    </todo-item>
                  `
              )}
            </ul>
          `
        }
      `;
    };
  },
  {text: '', todos: []}
);
