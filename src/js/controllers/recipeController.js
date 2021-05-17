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
import { ctrlShopList } from './shopListController';

const ctrlRecipe = async () => {
  // // 0. Add recipe event listeners
  ctrlAddRecipeListeners();

  // Get params and set recipe ID and return status
  const { recipeID } = recipeView.getRecipeParams();
  if (recipeID) {
    state.recipe = new Recipe(recipeID);
    try {
      await state.recipe.getRecipe();
      // Determine if recipe is a fave or added to shopping list
      if (state.faves.isFave(recipeID)) state.recipe.isFave = true;
      if (state.shopList.ingsAdded(recipeID)) state.recipe.ingsAdded = true;
      // Render to UI
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
      } else if (event.target.closest(domStrings.recipeFavesIcon)) {
        // They have clicked the favourite button
        ctrlFaves();
      } else if (event.target.closest(domStrings.ingredientsIcon)) {
        // They have clicked 'Add to Shopping List' button
        ctrlShopList();
      }
    });

  // Handle hovers on fave icon - display hover text
  const recipeFavesIcon = document.querySelector(domStrings.recipeFavesIcon);
  const allFaveText = document.querySelectorAll(domStrings.recipeFavesText);
  const servingControl = document.querySelector(
    domStrings.recipeServingControl
  );

  recipeFavesIcon.addEventListener('mouseenter', (event) => {
    allFaveText.forEach((el) => el.classList.toggle('faves__text--visible'));
    servingControl.classList.toggle('recipe-details__servings--active');
  });

  recipeFavesIcon.addEventListener('mouseleave', (event) => {
    allFaveText.forEach((el) => el.classList.toggle('faves__text--visible'));
    servingControl.classList.toggle('recipe-details__servings--active');
  });

  // Handle hovers in document info box - display servings controls
  const recipeDetails = document.querySelector(domStrings.recipeDetails);

  recipeDetails.addEventListener('mouseenter', (event) => {
    servingControl.classList.toggle('recipe-details__servings--active');
  });

  recipeDetails.addEventListener('mouseleave', (event) => {
    servingControl.classList.toggle('recipe-details__servings--active');
  });

  // Handle hovers on addToList icon
  const ingredientsIcon = document.querySelector(domStrings.ingredientsIcon);
  const ingredientsSvg = document.querySelector(domStrings.ingredientsSvg);
  const allListText = document.querySelectorAll(domStrings.ingredientsListText);

  ingredientsIcon.addEventListener('mouseenter', (event) => {
    ingredientsIcon.classList.add('ingredients__icon--isOnList');
    ingredientsSvg.classList.add('ingredients__svg--isOnList');
    allListText.forEach((el) =>
      el.classList.toggle('ingredients__listText--visible')
    );
  });

  ingredientsIcon.addEventListener('mouseleave', (event) => {
    if (!state.recipe.ingsAdded) {
      ingredientsIcon.classList.remove('ingredients__icon--isOnList');
      ingredientsSvg.classList.remove('ingredients__svg--isOnList');
    }
    allListText.forEach((el) =>
      el.classList.toggle('ingredients__listText--visible')
    );
  });

  // Handle mobile recipe nav
  const mobNavs = document.querySelectorAll('.recipe__mobNav');

  if (mobNavs) {
    mobNavs.forEach((mobNav) => {
      mobNav.addEventListener('click', () => {
        document
          .querySelector('.recipe-info')
          .classList.toggle('recipe-info--mobVisible');

        document
          .querySelector('.method')
          .classList.toggle('method--mobVisible');

        mobNavs.forEach((mobNav) => {
          mobNav.classList.toggle('recipe__mobNav--visible');
        });
      });
    });
  }
};

ctrlRecipe();
