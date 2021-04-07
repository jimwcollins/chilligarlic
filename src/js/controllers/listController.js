/*******************************
 *
 * CHILLI+GARLIC
 * CONTROLLER: listController.js
 *
 *******************************/

import { domStrings } from '../views/base';
import ShopList from '../models/ShopList';
import * as shopListView from '../views/shopListView';

// Initialise shopping list
export const initShopList = () => {
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
export const ctrlShopList = () => {
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
