import { shallowDiffers } from './helpers.js';

export default class extends HTMLElement {
  get props () {
    return this._props;
  }

  set props (nextProps) {
    // HACK: Stashing the props in an instance var here to accommodate
    // the timeout hack in the constructor
    const prevProps = this._props;
    this._props = nextProps;
    this.doRender(prevProps, nextProps);
  }

  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    // HACK: Workaround to force props setter method to be triggered
    // if the user does not provide props
    setTimeout(() => {
      if (!this.mounted) {
        this.props = null;
      }
    });
  }

  disconnectedCallback () {
    this.doLifecycleFunc('destroyed');
  }

  doLifecycleFunc (funcName) {
    if (this.lifecycle[funcName]) {
      // To be implemented by the subclass
      this.lifecycle[funcName](this.getLifecycleArgs(funcName));
    }
  }

  doRender (prev, next) {
    if (!shallowDiffers(prev, next)) {
      return;
    }

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
