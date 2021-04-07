/***************************
 *
 * CHILLI+GARLIC
 * CONTROLLER: recipeController.js
 *
 ***************************/

import { domStrings } from '../views/base';
import Recipe from '../models/Recipe';
import * as recipeView from '../views/recipeView';
import { ctrlFaves } from './favesController';
import { ctrlShopList } from './listController';

export const ctrlRecipe = async () => {
  // 0. Add recipe event listeners
  ctrlAddRecipeListeners();

  // 1. Get params and set recipe ID and return status
  const { recipeID } = recipeView.getRecipeParams();

  if (recipeID) {
    // 2. Construct recipe object
    state.recipe = new Recipe(recipeID);

    try {
      // 3. Retrieve recipe details
      await state.recipe.getRecipe();

      // 4. Is it a fave? If so, set flag
      if (state.faves.isFave(recipeID)) {
        state.recipe.isFave = true;
      }

      // 5. Render to UI
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert('Error retrieving recipe');
      console.log(error);
    }
  }
};

// Add event listeners if we're on the recipe page
const ctrlAddRecipeListeners = () => {
  // Event listener on recipe info sidebar to handle various events through delegation
  document
    .querySelector(domStrings.recipeInfo)
    .addEventListener('click', (event) => {
      // Check which button has been clicked
      if (event.target.matches('.btn-serveDec, .btn-serveDec *')) {
        // We have matched the decrease servings button or any of its children

        // Only decrease servings if it is greater than 1
        if (state.recipe.servings > 1) {
          state.recipe.updateIngredients('dec');
          recipeView.renderNewIngredients(
            state.recipe.servings,
            state.recipe.ingredients
          );
        }
      } else if (event.target.matches('.btn-serveInc, .btn-serveInc *')) {
        // We have matched the increase servings button or any of its children

        state.recipe.updateIngredients('inc');
        recipeView.renderNewIngredients(
          state.recipe.servings,
          state.recipe.ingredients
        );
      } else if (event.target.closest(domStrings.recipeFaves)) {
        // They have clicked the favourite button
        ctrlFaves();
      } else if (event.target.closest(domStrings.recipeShopList)) {
        // They have clicked 'Add to Shopping List' button
        ctrlShopList();
      }
    });

  // Handle hovers on fave icon - display hover text
  document
    .querySelector(domStrings.recipeFaves)
    .addEventListener('mouseenter', (event) => {
      document
        .querySelectorAll('.faves__text')
        .forEach((el) => el.classList.toggle('faves__text--visible'));
      document
        .querySelector(domStrings.recipeServingControl)
        .classList.toggle('recipe-details__servings--active');
    });

  document
    .querySelector(domStrings.recipeFaves)
    .addEventListener('mouseleave', (event) => {
      document
        .querySelectorAll('.faves__text')
        .forEach((el) => el.classList.toggle('faves__text--visible'));
      document
        .querySelector(domStrings.recipeServingControl)
        .classList.toggle('recipe-details__servings--active');
    });

  // Handle hovers in document info box - display servings controls
  document
    .querySelector(domStrings.recipeDetails)
    .addEventListener('mouseenter', (event) => {
      document
        .querySelector(domStrings.recipeServingControl)
        .classList.toggle('recipe-details__servings--active');
    });

  document
    .querySelector(domStrings.recipeDetails)
    .addEventListener('mouseleave', (event) => {
      document
        .querySelector(domStrings.recipeServingControl)
        .classList.toggle('recipe-details__servings--active');
    });
};
