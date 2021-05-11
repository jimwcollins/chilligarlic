/***************************
 *
 * CHILLI+GARLIC
 * COMPONENT: footer.js
 *
 ***************************/

class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
      <footer class="footer">
        <p class="footer__text--left">
          Designed and coded by James Collins © 2021
        </p>

        <img
          src="img/Logo/Chill_Logo_Small_Red.png"
          alt=""
          class="footer__logo"
        />

        <p class="footer__text--right">
          Powered by Spoonacular API
        </p>
      </footer>
    `;
  }
}

customElements.define('footer-comp', Footer);
