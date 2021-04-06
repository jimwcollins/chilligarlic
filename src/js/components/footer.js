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
        <ul class="footer__nav">
          <li class="footer__nav__item">
            <a href="" class="footer__nav__link">Contact</a>
          </li>
          <li class="footer__nav__item">
            <a href="" class="footer__nav__link">Disclaimer</a>
          </li>
          <li class="footer__nav__item">
            <a href="" class="footer__nav__link">Privacy</a>
          </li>
          <li class="footer__nav__item">
            <a href="" class="footer__nav__link">Cookies</a>
          </li>
        </ul>

        <img
          src="img/Logo/Chill_Logo_Small_Red.png"
          alt=""
          class="footer__logo"
        />

        <p class="footer__text">
          Designed and coded by James Collins © Chilli+Garlic 2020
        </p>
      </footer>
    `;
  }
}

customElements.define('footer-comp', Footer);
