/***************************
 *
 * CHILLI+GARLIC
 * CONTROLLER: index.js
 *
 ***************************/

/***********
 * Imports
 ***********/

// SCSS
import '../sass/main.scss';

// JS
import { domStrings } from './views/base';

// Components
import Header from './components/header';
import SidePanel from './components/sidePanel';
import Footer from './components/footer';

import { ctrlSearch } from './controllers/searchController';
import { ctrlRecipe } from './controllers/recipeController';
import { initFaves } from './controllers/favesController';
import { initShopList } from './controllers/shopListController';

/**************
 * Setup code
 **************/

// Global state of the app
// includes Search object, current Recipe object, shopping list object, liked recipes
const state = {};

// TESTING
window.state = state;

// Add event listener upon page load, then check which page we're on
window.addEventListener('load', () => {
  // Initialise faves and shopping list, restoring from storage if possible
  initFaves();
  initShopList();

  if (location.pathname === domStrings.searchPage) {
    // If we're on the search results page, set the state then call ctrlSearch function
    ctrlSearch();
  } else if (location.pathname === domStrings.recipePage) {
    // If we're on the recipe page, call ctrlRecipe function
    ctrlRecipe();
  }
});
