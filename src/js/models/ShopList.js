/***************************
 *
 * CHILLI+GARLIC
 * MODEL: ShopList.js
 *
 ***************************/

/***************************
 *
 * ShopList object
 *   Methods:
 *       persistList()
 *       restoresList()
 *       addItems
 *       removeItem
 *   Properties:
 *       list: array of listItem objects
 *           listItem:
 *               id
 *               quantity
 *               unit
 *               ing
 *               recipeId
 *
 ****************************/

// Import external package to generate unique ids for us
import uniqid from 'uniqid';

export default class ShopList {
  constructor() {
    this.list = [];
  }

  addRecipeToList(ingredients) {
    const newListItems = [];

    ingredients.forEach((ingredient) => {
      newListItems.push({
        id: uniqid(),
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        ingredient: ingredient.ingredient,
        recipeID: state.recipe.id,
      });
    });

    this.list.push(...newListItems);
    this.persistList();
    return newListItems;
  }

  // Remove all of recipe's ingredients from list
  removeRecipeFromList(recipeID) {
    const newList = this.list.filter(
      (listItem) => listItem.recipeID !== recipeID
    );

    this.list = newList;
    this.persistList();
  }

  removeItem(id) {
    const indexToDel = this.list.findIndex((item) => item.id === id);
    this.list.splice(indexToDel, 1);
    this.persistList();
  }

  clear() {
    this.list = [];
    this.persistList();
  }

  // Persist the search object by turning it into a string and storing in session storage
  persistList() {
    localStorage.setItem('shopList', JSON.stringify(this.list));
  }

  // Retrieve search from storage, parse then restore search object details
  restoreList() {
    const arrLocalList = JSON.parse(localStorage.getItem('shopList'));

    // If the retrieved fave list is not null or 0, restore to current Faves object
    if (arrLocalList && arrLocalList.length > 0) {
      this.list = arrLocalList;
    }
  }

  // Determines if this recipe's ingredients are on shopping list
  ingsAdded(recipeID) {
    return this.list.some((listItem) => listItem.recipeID === recipeID);
  }
}
