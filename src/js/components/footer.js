/***************************
 *
 * CHILLI+GARLIC
 * COMPONENT: footer.js
 *
 ***************************/

import footerLogo from '../../img/Logo/Chill_Logo_Small_Red.png';

class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
      <footer class="footer">
        <p class="footer__text--left footer__text--main">
          Designed and coded by James Collins © 2021
        </p>

        <img
          src=${footerLogo}
          alt=""
          class="footer__logo"
        />

        <p class="footer__text--mob">
        Designed and coded by James Collins © 2021
      </p>

        <p class="footer__text--right">
          Powered by Spoonacular API
        </p>
      </footer>
    `;
  }
}

customElements.define('footer-comp', Footer);
