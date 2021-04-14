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
 *       list: array of aisle objects
 *        aisle:
 *          aisle, aisleList: array of list items
 *            listItem:
 *               id
 *               quantity
 *               unit
 *               ing
 *               recipeId
 *
 ****************************/

// Import external package to generate unique ids for us
import uniqid from 'uniqid';
import { aisleRef } from './ShopList_Ref';

export default class ShopList {
  constructor() {
    this.list = [];
  }

  addRecipeToList(ingredients) {
    ingredients.forEach((ingredient) => {
      const parsedAisle = this.parseAisle(ingredient.aisle);

      // Is this ingredient's aisle already in list
      const aisleIndex = this.list.findIndex(
        (aisle) => aisle.aisle === parsedAisle
      );

      if (aisleIndex !== -1) {
        this.addItemToList(ingredient, aisleIndex);
      } else {
        this.list.push({ aisle: parsedAisle, aisleList: [] });
        this.addItemToList(ingredient, this.list.length - 1);
      }
    });

    this.list.sort((a, b) => {
      if (a.aisle < b.aisle) return -1;
      else if (a.aisle > b.aisle) return 1;
      else return 0;
    });

    this.persistList();
  }

  addItemToList(ingredient, index) {
    this.list[index].aisleList.push({
      id: uniqid(),
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      ingredient: ingredient.ingredient,
      recipeID: state.recipe.id,
    });
  }

  // Standardise the aisle text
  parseAisle(aisle) {
    const parsedRef = aisleRef[aisle];

    if (parsedRef) return parsedRef;
    else return aisle;
  }

  // Remove all of recipe's ingredients from list
  removeRecipeFromList(recipeID) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const currentAisle = this.list[i];

      const newAisleList = currentAisle.aisleList.filter(
        (listItem) => listItem.recipeID !== recipeID
      );

      if (newAisleList.length > 0) currentAisle.aisleList = newAisleList;
      else this.list.splice(i, 1);
    }

    this.persistList();
  }

  removeItem(id) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const aisle = this.list[i];
      const indexToDel = aisle.aisleList.findIndex((item) => item.id === id);
      let removeAisle;

      if (indexToDel !== -1) {
        const item = aisle.aisleList.find((item) => item.id === id);
        aisle.aisleList.splice(indexToDel, 1);

        // Remove aisle if all subitems removed
        if (aisle.aisleList.length === 0) {
          removeAisle = true;
          this.list.splice(i, 1);
        }

        this.persistList();

        // Return object indicating if this is last item on list for current recipe
        // and if we need to remove parent list in UI
        if (state.recipe && state.recipe.id === item.recipeID) {
          const lastRecipeItemDeleted = !this.ingsAdded(state.recipe.id);
          return { removeAisle, lastRecipeItemDeleted };
        }
      }
    }
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
    for (const aisle of this.list) {
      const found = aisle.aisleList.some(
        (listItem) => listItem.recipeID === recipeID
      );

      if (found) return true;
    }

    return false;
  }
}
