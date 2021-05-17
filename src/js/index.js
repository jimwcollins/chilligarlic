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

// Add event listener upon page load
window.addEventListener('load', () => {
  // Initialise faves and shopping list, restoring from storage if possible
  initFaves();
  initShopList();
});
