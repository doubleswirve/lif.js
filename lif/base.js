import {getState} from './helpers.js';

export default class extends HTMLElement {
  get props () {
    return this._props;
  }

  set props (props) {
    // HACK: Stashing the props in an instance var here to accommodate
    // the timeout hack in the constructor
    this._props = props;
    // To be implemented by the subclass
    this.render();
  }

  constructor () {
    super();

    this.attachShadow({mode: 'open'});

    // HACK: Workaround to force props setter method to be triggered
    // if the user does not provide props
    setTimeout(() => {
      if (this._props === undefined) {
        this.props = null;
      }
    });
  }

  setState (nextState) {
    this._state = getState(this._state, nextState);
    // To be implemented by the subclass
    this.render();
  }
};
