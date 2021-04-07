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

import ShopList from './models/ShopList';
import * as shopListView from './views/shopListView';

// Components
import Header from './components/header';
import Footer from './components/footer';

import { ctrlSearch } from './controllers/searchController';
import { ctrlRecipe } from './controllers/recipeController';
import { initFaves } from './controllers/favesControllers';

/**************
 * Initial code
 **************/

// Global state of the app
// includes Search object, current Recipe object, shopping list object, liked recipes
const state = {};

// TESTING
window.state = state;

// Add event listener upon page load, then check which page we're on
window.addEventListener('load', () => {
  // Initialise faves and shopping list and restore from storage if possible
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

/**************************
 * Shopping List Controller
 **************************/

// Initialise shopping list
const initShopList = () => {
  state.shopList = new ShopList();

  // Restore from local storage if we can
  state.shopList.restoreList();

  // Now render the list to the UI if it isn't empty
  if (state.shopList.list.length > 0) {
    shopListView.removePlaceholder();
    state.shopList.list.forEach((item) => shopListView.renderItem(item));
  }
};

// Handle the 'Add to Shopping List' button
const ctrlShopList = () => {
  // 1. Add the current recipe's ingredients to the shopping list
  state.recipe.ingredients.forEach((ingredient) => {
    state.shopList.addItem(
      ingredient.quantity,
      ingredient.unit,
      ingredient.ingredient
    );
  });

  // 2. Update the UI
  // If the placeholder is in place, remove it
  shopListView.removePlaceholder();

  state.shopList.list.forEach((item) => {
    shopListView.renderItem(item);
  });
};

// Listener for shopping list
document
  .getElementById(domStrings.menu__shopList)
  .addEventListener('click', (event) => {
    if (event.target.closest('.list__del')) {
      // They have clicked a delete button. Find out which item and delete it
      const itemToDel = event.target.closest('.shoplist__item');

      // Delete from state shopping list
      state.shopList.removeItem(itemToDel.dataset.item_id);

      // Delete from UI. Restore placeholder if this is the last item
      shopListView.removeItem(itemToDel);

      if (state.shopList.list.length === 0) {
        shopListView.addPlaceholder();
      }
    } else if (event.target.closest(domStrings.shopList__edit)) {
      console.log('Edit button clicked');
    } else if (event.target.closest(domStrings.shopList__clear)) {
      state.shopList.clear();
      shopListView.clear();
    }
  });
