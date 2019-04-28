import {html} from 'https://unpkg.com/lit-html?module';
import {stateless} from '../liff/liff.js';

const HelloMessage = props => {
  return html`
    <style>
      span {
        font-style: italic;
      }
    </style>
    <p>Hello, <span>${props.name}</span></p>
  `;
};

stateless('hello-message', HelloMessage);
