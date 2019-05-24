export default class extends HTMLElement {
  set props (props) {
    // Stashing the props in an instance var here to accommodate
    // the timeout hack in the constructor
    this._props = props;
    // To be implemented by the subclass
    this.render();
  }

  set state (state) {
    this._state = state;
    // To be implemented by the subclass
    this.render();
  }

  constructor () {
    super();

    this._shadowRoot = this.attachShadow({mode: 'open'});

    // HACK: Workaround to force props setter method to be triggered
    // if the user does not provide props
    setTimeout(() => {
      if (this._props === undefined) {
        this.props = null;
      }
    });
  }
};
