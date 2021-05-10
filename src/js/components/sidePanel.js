/***************************
 *
 * CHILLI+GARLIC
 * COMPONENT: sidePanel.js
 *
 ***************************/

class SidePanel extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = /*html*/ `
      <div id="sidePanel__bg"></div>
      <div id="sidePanel">
        <slot></slot>
      </div>
      <style>
        #sidePanel__bg {
          position: fixed;
          background-color: rgba(0, 0, 0, 0.5);
          width: 100%;
          height: 100vh;
          opacity: 0%;
          visibility: hidden;
          z-index: 50;
          overflow: auto;
          overscroll-behavior: contain;
          transition: all 0.5s;
        }

        :host([show]) #sidePanel__bg {
          opacity: 100%;
          visibility: visible;
        } 

        #sidePanel {
          position: fixed;
          background-color: var(--color-white);
          right: 0;
          height: calc(100vh - var(--header-height));
          display: flex;
          flex-direction: column;
          width: 50%;
          z-index: 50;
          overscroll-behavior: contain;
          transform: translateX(100%);
          transition: all 1s ease;
        }

        :host([show]) #sidePanel {
          transform: translateX(0);
        }

        :host([scrolled]) #sidePanel {
          height: calc(100vh - 10rem);
        }
      </style>
    `;

    this.fave = /*html*/ `
      <p>Faves</p>
      <ul id="faves__list"></ul>
    `;

    this.shopList = /*html*/ `
      <p>Shopping List</p>
      <ul id="shopList__list"></ul>
    `;

    this.panelContent = this.shadowRoot.getElementById('sidePanel__content');
    this.header = document.querySelector('.header-container');

    this.shadowRoot
      .getElementById('sidePanel__bg')
      .addEventListener('click', () => this.toggle());
  }

  toggle(parentButton) {
    if (parentButton) this.parentButton = parentButton;
    this.parentButton.classList.toggle('header__icon--active');
    this.parentButton.firstElementChild.classList.toggle(
      'header__icon__svg--active'
    );

    if (this.hasAttribute('show')) {
      if (this.header.getAttribute('data-theme') === 'header-home-panel')
        this.header.setAttribute('data-theme', 'header-home');

      this.removeAttribute('show');
    } else {
      if (this.header.getAttribute('data-theme') === 'header-home')
        this.header.setAttribute('data-theme', 'header-home-panel');

      this.setAttribute('show', '');
    }
  }
}

customElements.define('sidepanel-comp', SidePanel);
