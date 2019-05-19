import {html} from 'https://unpkg.com/lit-html?module';
import {stateless} from '../lif/lif.js';

function StarCounter ({
  toClickUponAStar = () => {},
}) {
  return html`
    <style>
      span {
        color: blue;
        margin-right: 2px;
      }
    </style>
    <span @click=${e => {
      e.preventDefault();
      toClickUponAStar();
    }}>*</span>
  `;
}

stateless('star-counter', StarCounter);
