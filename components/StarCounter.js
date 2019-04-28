import {html} from 'https://unpkg.com/lit-html?module';
import {stateless} from '../liffick/liffick.js';

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
