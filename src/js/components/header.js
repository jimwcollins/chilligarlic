/***************************
 *
 * CHILLI+GARLIC
 * COMPONENT: header.js
 *
 ***************************/

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.isHome = this.getAttribute('home');

    this.innerHTML = /*html*/ `
      <header class="header-container" data-theme=${
        this.isHome ? 'header-home' : 'header-main'
      }>

      <div class="header grid">
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

        <!-- Mobile-only search button -->
        <figure class="header__icon header__mobSearch__icon">
          <svg class="header__icon__svg header__mobSearch__icon__svg">
            <use xlink:href="img/Chilli_Icons_Sprite.svg#icon-magnifying-glass"></use>
          </svg>
        </figure>


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
              <div class="menu__dropdown menu__faves" id="menu__faves">
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
              <div class="menu__dropdown menu__shopList" id="menu__shopList">
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

        <nav class="header__mobNav">
          <figure class="header__icon" id='mobNav__fave'>
            <svg class="header__icon__svg">
              <use xlink:href="img/Chilli_Icons_Sprite.svg#icon-heart"></use>
            </svg>
          </figure>
          <figure class="header__icon" id='mobNav__shopList'>
          <svg class="header__icon__svg">
            <use xlink:href="img/Chilli_Icons_Sprite.svg#icon-list2"></use>
          </svg>
        </figure>
        </nav>
      </div>

      <!-- Mobile search -->
      <div class="header__mobSearch grid">
        <form
          action="searchResults.html"
          class="header__mobSearch__form"
          method="GET"
          id="search"
        >
          <input
            type="text"
            class="header__mobSearch__input"
            name="search"
            autocomplete="off"
            placeholder="Search recipes"
            required
          />

          <div class="header__mobSearch__controls">          
            <button class="header__mobSearch__btn" id="mobSearch__clear" type="button">
              <svg class="header__mobSearch__svg header__mobSearch__svg--cross">
                <use xlink:href="img/Chilli_Icons_Sprite.svg#icon-cross"></use>
              </svg>
            </button>
            <button class="header__mobSearch__btn" type="submit">
              <svg class="header__mobSearch__svg">
                <use xlink:href="img/Chilli_Icons_Sprite.svg#icon-magnifying-glass"></use>
              </svg>
            </button>
          </div>
        </form>
      </div>

      <sidepanel-comp id="sidePanel__faves" class="menu__faves">
          <div class="sidePanel__header">
            <p>My Favourites</p>
            <svg class="sidePanel__icon" id="faves__clear">
              <use
                xlink:href="img/Chilli_Icons_Sprite.svg#icon-circle-with-cross"
              ></use>
            </svg>
          </div>

          <div id="faves__placeholder" class='sidePanel__placeholder'>
            <p>
              Love a recipe? This could be its new home!
            </p>
          </div>

          <ul id="faves__list" class='scrollableDropdown'></ul>
      </sidepanel-comp>
      
      <sidepanel-comp id="sidePanel__shopList" class="menu__shopList">
          <div class="sidePanel__header">
            <p>My Shopping List</p>
            <svg class="sidePanel__icon" id="shopList__clear">
              <use
                xlink:href="img/Chilli_Icons_Sprite.svg#icon-circle-with-cross"
              ></use>
            </svg>
          </div>

          <div id="shopList__placeholder" class="sidePanel__placeholder">
            <p>
              Make your shopping list happy by filling it with lovely
              ingredients.
            </p>
          </div>

          <ul id="shopList__list" class="scrollableDropdown"></ul>
      </sidepanel-comp>
    </header>
    `;

    /*******************
     * Header JS
     *******************/

    const headerContainer = document.querySelector('.header-container');
    const header = document.querySelector('.header');
    const headerLogo = document.querySelector('.header__logo__img');
    const panelComps = document.querySelectorAll('sidepanel-comp');

    // Handle home page
    if (this.isHome) {
      const heroSection = document.querySelector('.hero');

      // Change theme of header when we near end of hero
      const handleHeader = ([entry]) => {
        if (entry.isIntersecting) {
          headerContainer.setAttribute('data-theme', 'header-home');
          header.classList.remove('header--scroll');
          headerLogo.classList.remove('header__logo__img--scroll');

          panelComps.forEach((panelComp) => {
            panelComp.removeAttribute('scrolled');
          });
        } else {
          headerContainer.setAttribute('data-theme', 'header-main');
          header.classList.add('header--scroll');
          headerLogo.classList.add('header__logo__img--scroll');

          panelComps.forEach((panelComp) => {
            panelComp.setAttribute('scrolled', '');
          });
        }
      };

      const headerObserverHome = new IntersectionObserver(handleHeader, {
        threshold: 0.14,
      });

      headerObserverHome.observe(heroSection);

      // Handle search on home page
      const heroSearch = document.querySelector('.hero__search');
      const headerSearch = document.querySelector('.header__search__form');
      const headerMobSearch = document.querySelector(
        '.header__mobSearch__icon'
      );

      // Hide main search and show header search when hero passes 95% threshold
      const handleSearch = ([entry]) => {
        if (entry.isIntersecting) {
          heroSearch.classList.remove('hero__search--hidden');
          headerSearch.classList.add('header__search__form--hidden');
          headerMobSearch.classList.add('header__mobSearch__icon--hidden');
        } else {
          heroSearch.classList.add('hero__search--hidden');
          headerSearch.classList.remove('header__search__form--hidden');
          headerMobSearch.classList.remove('header__mobSearch__icon--hidden');
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

          panelComps.forEach((panelComp) => {
            panelComp.setAttribute('scrolled', '');
          });
        } else {
          header.classList.remove('header--scroll');
          headerLogo.classList.remove('header__logo__img--scroll');

          panelComps.forEach((panelComp) => {
            panelComp.removeAttribute('scrolled');
          });
        }
      };

      const headerObserverMain = new IntersectionObserver(handleHeaderMain, {
        threshold: 1,
      });

      headerObserverMain.observe(heading);
    }

    // Handle mobile search
    document
      .querySelector('.header__mobSearch__icon')
      .addEventListener('click', () => handleMobSearch());

    document
      .getElementById('mobSearch__clear')
      .addEventListener('click', () => handleMobSearch());

    const handleMobSearch = () => {
      const mobSearchIcon = document.querySelector('.header__mobSearch__icon');
      const mobSearchIconSvg = document.querySelector(
        '.header__mobSearch__icon__svg'
      );
      const mobSearch = document.querySelector('.header__mobSearch');
      const mobForm = document.querySelector('.header__mobSearch__form');
      const mobControls = document.querySelector(
        '.header__mobSearch__controls'
      );
      const searchActive = document.querySelector('.header__mobSearch--active');

      if (searchActive) {
        mobForm.classList.remove('header__mobSearch__form--active');
        mobControls.classList.remove('header__mobSearch__controls--active');

        setTimeout(() => {
          mobSearch.classList.remove('header__mobSearch--active');
          mobSearchIcon.classList.remove('header__mobSearch__icon--active');
          mobSearchIconSvg.classList.remove(
            'header__mobSearch__icon__svg--active'
          );
        }, 400);
      } else {
        mobSearchIcon.classList.add('header__mobSearch__icon--active');
        mobSearchIconSvg.classList.add('header__mobSearch__icon__svg--active');
        mobSearch.classList.add('header__mobSearch--active');

        setTimeout(() => {
          mobForm.classList.add('header__mobSearch__form--active');
          mobControls.classList.add('header__mobSearch__controls--active');
        }, 200);
      }
    };

    // Handle mobile nav buttons
    // When one is clicked toggle the side panel
    // Pass button in so we can toggle its appearance from within component
    const mobNavFave = document.getElementById('mobNav__fave');
    const sidepanelFaves = document.getElementById('sidePanel__faves');
    const mobNavShop = document.getElementById('mobNav__shopList');
    const sidepanelShopList = document.getElementById('sidePanel__shopList');

    mobNavFave.addEventListener('click', () => {
      if (sidepanelShopList.hasAttribute('show'))
        sidepanelShopList.toggle(mobNavShop);
      sidepanelFaves.toggle(mobNavFave);
    });

    mobNavShop.addEventListener('click', () => {
      if (sidepanelFaves.hasAttribute('show'))
        sidepanelFaves.toggle(mobNavFave);
      sidepanelShopList.toggle(mobNavShop);
    });
  }
}

customElements.define('header-comp', Header);
