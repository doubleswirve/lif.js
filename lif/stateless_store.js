// Anyway to re-use stateless class?

/*
picturing something like...

function MyStatelessStore (store) {
  return function (props) {
    return html`
      <button
        @click=${store.send('INC_COUNTER')}
      >
        {props.text}
      </button>
      <span>${store.state.count}</span>
    `;
  }
}

or...

function MyStatelessStore (props, store) {
  return html`
    <button
      @click=${store.send('INC_COUNTER')}
    >
      {props.text}
    </button>
    <span>${store.state.count}</span>
  `;
}

---


statelessStore('my-name', MyStatelessStore, myStore);

// Maybe subclass stateless.js class; then just hook into
// pub/sub on store instance, then trigger render method...
*/
