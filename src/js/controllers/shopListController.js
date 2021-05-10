/*******************************
 *
 * CHILLI+GARLIC
 * CONTROLLER: listController.js
 *
 *******************************/

import { domStrings } from '../views/base';
import ShopList from '../models/ShopList';
import * as shopListView from '../views/shopListView';
import * as recipeView from '../views/recipeView';

// Initialise shopping list
export const initShopList = () => {
  state.shopList = new ShopList();

  // Restore from local storage if we can
  state.shopList.restoreList();

  // Now render the list to the UI if it isn't empty
  if (state.shopList.list.length > 0) {
    shopListView.removePlaceholder();
    shopListView.renderList(state.shopList.list);
  }
};

// Handle the 'Add to Shopping List' button
export const ctrlShopList = () => {
  // If the current recipe's ingredients are not already on list then add them, otherwise remove them
  if (!state.recipe.ingsAdded) {
    state.shopList.addRecipeToList(state.recipe.ingredients);
    state.recipe.ingsAdded = true;
    recipeView.renderListStatus(true);
    shopListView.clear();
    shopListView.removePlaceholder();
    shopListView.renderList(state.shopList.list);
  } else {
    state.shopList.removeRecipeFromList(state.recipe.id);
    state.recipe.ingsAdded = false;
    recipeView.renderListStatus(false);
    shopListView.clear();

    if (state.shopList.list.length > 0) {
      shopListView.removePlaceholder();
      shopListView.renderList(state.shopList.list);
    } else {
      shopListView.addPlaceholder();
    }
  }
};

// Add event handler to desk and mobile faves list to handle deletions from there
const listMenus = document.querySelectorAll(domStrings.shopList__menu);

listMenus.forEach((listMenu) => {
  listMenu.addEventListener('click', (event) => {
    addShoplistListener(event);
  });
});

const addShoplistListener = (event) => {
  if (event.target.closest('.list__del')) {
    // They have clicked a delete button. Find out which item and delete it
    const itemToDel = event.target.closest('.shoplist__item');

    // Delete from state shopping list and UI. Restore placeholder if last item.
    // If this deletes the last item for current recipe, update recipe view.
    const { removeAisle, lastRecipeItemDeleted } = state.shopList.removeItem(
      itemToDel.dataset.item_id
    );

    if (lastRecipeItemDeleted) {
      state.recipe.ingsAdded = false;
      recipeView.renderListStatus(false);
    }

    shopListView.removeItem(itemToDel, removeAisle);

    if (state.shopList.list.length === 0) {
      shopListView.addPlaceholder();
    }
  } else if (event.target.closest(domStrings.shopList__clear)) {
    state.shopList.clear();
    shopListView.clear();

    if (state.recipe) {
      state.recipe.ingsAdded = false;
      recipeView.renderListStatus(false);
    }
  }
};
