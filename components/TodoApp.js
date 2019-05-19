import {html} from 'https://unpkg.com/lit-html?module';
import {stateful} from '../lif/lif.js';
import './TodoText.js';
import './TodoItem.js';

function addTodo (state, text) {
  return {
    ...state,
    text: '',
    todos: state.todos.concat({
      completed: false,
      todo: text
    })
  }
}

function setText (state, text) {
  return {
    ...state,
    text
  }
}

function toggleTodo (state, index) {
  return {
    ...state,
    todos: state.todos
      .slice(0, index)
      .concat(
        {
          ...state.todos[index],
          completed: !state.todos[index].completed
        },
        state.todos.slice(index + 1)
      )
  }
}

function removeTodo (state, index) {
  return {
    ...state,
    todos: state.todos
      .slice(0, index)
      .concat(
        state.todos.slice(index + 1)
      )
  }
}

function clearTodos (state) {
  return {
    ...state,
    todos: []
  }
}

function TodoApp (dispatch) {
  return function (props, state) {
    console.log(state.todos);
    return html`
      <todo-text
        .Props=${{
          placeholder: 'Type sumptin...',
          text: state.text,
          addTodo (text) {
            dispatch(addTodo, state, text);
          },
          setText (text) {
            dispatch(setText, state, text);
          }
        }}
      ></todo-text>
      ${state.todos.length > 0
        ? html`
          <button @click=${() => {
            if (confirm('Sure?')) {
              dispatch(clearTodos, state)
            }
          }}>Clear all</button>
          <ul>
            ${state.todos.map((todo, index) => {
              return html`
                <todo-item
                  .Props=${{
                    todo,
                    index,
                    removeTodo (index) {
                      dispatch(removeTodo, state, index);
                    },
                    toggleTodo (index) {
                      dispatch(toggleTodo, state, index);
                    }
                  }}
                ></todo-item>
              `;
            })}
          </ul>
        `
        : ''}
    `;
  };
}

stateful('todo-app', TodoApp, {
  text: '',
  todos: []
});
