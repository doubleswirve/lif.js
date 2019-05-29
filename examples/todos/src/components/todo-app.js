import { html } from '../../../../node_modules/lit-html/lit-html.js';
import stateful from '../../../../src/stateful.js';
import './todo-item.js';
import './todo-text.js';

function addTodo ({ state }, text) {
  return {
    text: '',
    todos: state.todos.concat({
      completed: false,
      id: `${state.todos.length}-${Date.now()}`,
      text
    })
  };
}

function clearTodos () {
  return {
    todos: []
  };
}

function getTodoIndex (todos, todo) {
  return todos.findIndex(({ id }) => id === todo.id);
}

function removeTodo ({ state }, todo) {
  const index = getTodoIndex(state.todos, todo);

  return {
    todos: state.todos.slice(0, index).concat(state.todos.slice(index + 1))
  };
}

function setText (_, text) {
  return {
    text
  };
}

function toggleTodo ({ state }, todo) {
  const index = getTodoIndex(state.todos, todo);

  return {
    todos: state.todos.slice(0, index).concat(
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
  dispatch => (_, { text, todos }) => html`
    <style>
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    </style>
    <h1>todo-app</h1>
    <todo-text
      .props=${
        {
          placeholder: 'Type a todo and hit enter...',
          text,
          addTodo (text) {
            dispatch(addTodo, text);
          },
          setText (text) {
            dispatch(setText, text);
          }
        }
      }
    ></todo-text>
    ${
      todos.length < 1
        ? ''
        : html`
            <button @click=${() => dispatch(clearTodos)}>
              clear all
            </button>
            <ul>
              ${
                todos.map(
                  todo =>
                    html`
                      <todo-item
                        .props=${
                          {
                            todo,
                            removeTodo (todo) {
                              dispatch(removeTodo, todo);
                            },
                            toggleTodo (todo) {
                              dispatch(toggleTodo, todo);
                            }
                          }
                        }
                      >
                      </todo-item>
                    `
                )
              }
            </ul>
          `
    }
  `,
  { text: '', todos: [] }
);
