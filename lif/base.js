export default class extends HTMLElement {
  get props () {
    return this._props;
  }

  set props (props) {
    // HACK: Stashing the props in an instance var here to accommodate
    // the timeout hack in the constructor
    this._props = props;
    this.doRender();
  }

  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    // HACK: Workaround to force props setter method to be triggered
    // if the user does not provide props
    setTimeout(() => {
      if (this._props === undefined) {
        this.props = null;
      }
    });
  }

  disconnectedCallback () {
    this.doLifecycleFunc('destroyed');
  }

  doLifecycleFunc (funcName) {
    if (!this.lifecycle[funcName]) {
      return;
    }
    // To be implemented by the subclass
    this.lifecycle[funcName](...this.getLifecycleArgs(funcName));
  }

  doRender () {
    // To be implemented by the subclass
    this.render();

    if (this.mounted) {
      this.doLifecycleFunc('updated');
    } else {
      this.mounted = true;

      this.doLifecycleFunc('mounted');
    }
  }
}
