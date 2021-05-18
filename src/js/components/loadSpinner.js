import iconsSvg from '../../img/Chilli_Icons_Sprite.svg';

class LoadSpinner extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = /*html*/ `
      <div id="spinner">
        <svg id="spinnerSvg">
          <use href=${iconsSvg}#icon-spinner></use>            
        </svg>
      </div>
      <style>
        #spinner {
          display: none;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100vh;
          transition: all 0.5s;
        }

        #spinnerSvg {
          width: 5rem;
          height: 5rem;
          fill: var(--color-tertiary);
          animation: rotate 1.5s infinite linear;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        :host([show]) #spinner {
          display: flex;
        } 
      </style>
    `;
  }
}

customElements.define('load-spinner', LoadSpinner);
