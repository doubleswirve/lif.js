import {html, render} from 'https://unpkg.com/lit-html?module';
import {stateful, stateless} from './liffick.js';

function StarCounter () {
  return html`
    <style>
      span {
        color: blue;
        margin-right: 2px;
      }
    </style>
    <span>*</span>
  `;
}

stateless('star-counter', StarCounter);

function inc (state) {
  return state + 1;
}

function dec (state) {
  return state > 0 ? state - 1 : 0;
}

function ButtonCounter (dispatch) {
  return function (props, state) {
    return html`
      <div>
        <p>${props.desc}</p>
        <button
          @click=${() => dispatch(inc, state)}
        >
          ${state} ${state === 1 ? 'time' : 'times'}
        </button>
        <button
          @click=${() => dispatch(dec, state)}
        >
          --
        </button>
        <div>
          ${[...Array(state).keys()].map(
            () => html`<star-counter .Props=${null}></star-counter>`
          )}
        </div>
      </div>
    `;
  }
}

stateful('button-counter', ButtonCounter, 0);

function HelloMessage (props) {
  return html`
    <style>
      span {
        font-style: italic;
      }
    </style>
    <p>Hello, <span>${props.name}</span></p>
  `;
}

stateless('hello-message', HelloMessage);

render(
  html`
    <div>
      <hello-message
        .Props=${{name: 'Barnabee'}}
      ></hello-message>
      <button-counter
        .Props=${{desc: 'You\'ve clicked...'}}
      >
      </button-counter>
      <button-counter
        .Props=${{desc: 'And, you\'ve clicked this puppy...'}}
      >
      </button-counter>
    </div>
  `,
  document.body
);

// function increment (state) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() < 0.5) {
//         resolve({
//           ...state,
//           count: state.count + 1,
//           err: null
//         });
//       } else {
//         reject({
//           ...state,
//           err: 'A random error has occurred...'
//         });
//       }
//     }, 1e3);
//   });
// }

// function disable (state) {
//   return {
//     ...state,
//     disabled: true
//   };
// }

// function enable (state) {
//   return {
//     ...state,
//     disabled: false
//   };
// }

// function MyElementWrapped (dispatch) {
//   return function MyElement (state) {
//     return html`
//       <style>
//         .err {
//           color: red;
//         }
//       </style>
//       ${state.err && html`<p class="err">${state.err}</p>`}
//       <button
//         ?disabled=${state.disabled || false}
//         @click=${e => {
//           e.preventDefault();

//           dispatch(
//             enable,
//             dispatch(
//               increment,
//               dispatch(disable, state)
//             )
//           );
//         }}
//       >
//         Count ${state.count}
//       </button>
//       ${state.count && state.count > 0 && html`
//         <ul>
//           ${[...Array(state.count).keys()].map((_, index) => {
//             return html`
//               <li>index = ${index}</li>
//             `;
//           })}
//         </ul>
//       `}
//     `;
//   };
// }

// //
// function liffick (name, wrapped) {
//   function connect (state, shadowRoot) {
//     async function dispatch (func, state) {
//       try {
//         const nextState = await func(await state);

//         render(component(nextState), shadowRoot);

//         return nextState;
//       } catch (err) {
//         render(component(err), shadowRoot);

//         return err;
//       }
//     }

//     const component = wrapped(dispatch);

//     dispatch(_ => _, state);
//   }

//   customElements.define(name, class extends HTMLElement {
//     set Props (props) {
//     }

//     set State (state) {
//       connect(state, this.attachShadow({mode: 'open'}));
//     }
//   });
// }

// //
// liffick('my-element', MyElementWrapped);

// render(
//   html`
//     <h1>Hi, you</h1>
//     <br>
//     <my-element .State=${{count: 1}}></my-element>
//     <br>
//     <my-element .State=${{count: 10}}></my-element>
//   `,
//   document.body
// );
