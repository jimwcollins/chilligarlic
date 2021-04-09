/***************************
 *
 * CHILLI+GARLIC
 * COMPONENT: header.js
 *
 ***************************/

class Header extends HTMLElement {
  connectedCallback() {
    this.isHome = this.getAttribute('home');

    this.innerHTML = /*html*/ `
      <header class="header grid" data-theme=${
        this.isHome ? 'header-home' : 'header-main'
      }>

      <!-- Search -->
      <form
        action="searchResults.html"
        class="header__search__form"
        method="GET"
        id="search"
      >
        <input
          type="text"
          class="header__search__input"
          name="search"
          autocomplete="off"
          placeholder="Search recipes"
        />
        <button class="header__search__button" type="button">
          <svg class="header__search__icon">
            <use
              xlink:href="img/Chilli_Icons_Sprite.svg#icon-magnifying-glass"
            ></use>
          </svg>
        </button>
      </form>

      <!-- Logo -->
      <a href="/" class="header__logo"><img
          src="img/Logo/Chill_Logo_Red.png"
          alt=""
          class="header__logo__img"
      /></a>

      <!-- Nav elements -->
      <nav class="header__nav">
        <!-- Faves dropdown menu-->
        <div class="menu">
          <!-- Fave Icon -->
          <figure class="header__icon">
            <svg class="header__icon__svg">
              <use xlink:href="img/Chilli_Icons_Sprite.svg#icon-heart"></use>
            </svg>
          </figure>

          <!-- Fave Dropdown -->
          <div class="menu__panel">
            <div class="menu__dropdown" id="menu__faves">
              <div class="menu__dropdown__header">
                <p class="menu__dropdown__header__text">My Favourites</p>
                <svg class="menu__dropdown__header__icon" id="faves__clear">
                  <use
                    xlink:href="img/Chilli_Icons_Sprite.svg#icon-circle-with-cross"
                  ></use>
                </svg>
              </div>

              <div class="menu__placeholder" id="faves__placeholder">
                <p class="menu__placeholder__text">
                  Love a recipe? This could be its new home!
                </p>
              </div>

              <ul class="scrollableDropdown" id="faves__list"></ul>
            </div>
          </div>
        </div>

        <!-- Shopping list dropdown menu-->
        <div class="menu">
          <!-- Shopping List icon-->
          <figure class="header__icon">
            <svg class="header__icon__svg">
              <use xlink:href="img/Chilli_Icons_Sprite.svg#icon-list2"></use>
            </svg>
          </figure>

          <!-- Shopping List dropdown-->
          <div class="menu__panel">
            <div class="menu__dropdown" id="menu__shopList">
              <div class="menu__dropdown__header">
                <p class="menu__dropdown__header__text">My Shopping List</p>
                <svg class="menu__dropdown__header__icon" id="shopList__clear">
                  <use
                    xlink:href="img/Chilli_Icons_Sprite.svg#icon-circle-with-cross"
                  ></use>
                </svg>
              </div>

              <div class="menu__placeholder" id="shopList__placeholder">
                <p class="menu__placeholder__text">
                  Make your shopping list happy by filling it with lovely
                  ingredients.
                </p>
              </div>

              <ul class="scrollableDropdown" id="shopList__list"></ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
    `;

    /*******************
     * Header JS
     *******************/

    const header = document.querySelector('.header');
    const headerLogo = document.querySelector('.header__logo__img');

    // Handle home page
    if (this.isHome) {
      const heroSection = document.querySelector('.hero');

      // Change theme of header when we near end of hero
      const handleHeader = ([entry]) => {
        if (entry.isIntersecting) {
          header.setAttribute('data-theme', 'header-home');
          header.classList.remove('header--scroll');
          headerLogo.classList.remove('header__logo__img--scroll');
        } else {
          header.setAttribute('data-theme', 'header-main');
          header.classList.add('header--scroll');
          headerLogo.classList.add('header__logo__img--scroll');
        }
      };

      const headerObserverHome = new IntersectionObserver(handleHeader, {
        threshold: 0.14,
      });

      headerObserverHome.observe(heroSection);

      // Handle search on home page
      const heroSearch = document.querySelector('.hero__search');
      const headerSearch = document.querySelector('.header__search__form');

      // Hide main search and show header search when hero passes 95% threshold
      const handleSearch = ([entry]) => {
        if (entry.isIntersecting) {
          heroSearch.classList.remove('hero__search--hidden');
          headerSearch.classList.add('header__search__form--hidden');
        } else {
          heroSearch.classList.add('hero__search--hidden');
          headerSearch.classList.remove('header__search__form--hidden');
        }
      };

      const searchObserver = new IntersectionObserver(handleSearch, {
        threshold: 0.95,
      });

      searchObserver.observe(heroSection);
    } else {
      // Handle header for recipe and search pages
      const heading = document.querySelector('.heading');

      const handleHeaderMain = ([entry]) => {
        if (!entry.isIntersecting) {
          header.classList.add('header--scroll');
          headerLogo.classList.add('header__logo__img--scroll');
        } else {
          header.classList.remove('header--scroll');
          headerLogo.classList.remove('header__logo__img--scroll');
        }
      };

      const headerObserverMain = new IntersectionObserver(handleHeaderMain, {
        threshold: 1,
      });

      headerObserverMain.observe(heading);
    }
  }
}

customElements.define('header-comp', Header);
