/***************************
 *
 * CHILLI+GARLIC
 * CONTROLLER: favesController.js
 *
 ***************************/

import { domStrings } from '../views/base';
import Faves from '../models/Faves';
import * as favesView from '../views/favesView';
import * as recipeView from '../views/recipeView';

// Initialise faves
export const initFaves = () => {
  // Intialise Faves object
  state.faves = new Faves();

  // Restore from local storage if we can
  state.faves.restoreFaves();

  // Render complete fave list to menu if we have faves, else placeholder remains in place
  if (state.faves.faveList.length > 0) {
    favesView.removePlaceholder();
    state.faves.faveList.forEach((fave) => favesView.renderFave(fave));
  }
};

// Handle the faves button
export const ctrlFaves = () => {
  // If the current recipe is not already a fave then add it, otherwise remove it
  if (!state.recipe.isFave) {
    // We need to add a new fave

    // If favelist is currently empty, we first need to remove placeholder
    favesView.removePlaceholder();

    // Create a new fave then add it to fave list
    const newFave = {
      id: state.recipe.id,
      title: state.recipe.title,
      author: state.recipe.author,
      imageUrl: state.recipe.imageUrl,
    };

    // Add the fave, set the current recipe fave flag to true, then re-render
    state.faves.addFave(newFave);
    state.recipe.isFave = true;
    favesView.renderFave(newFave);
    recipeView.renderFaveStatus(true); // Set the faveIcon
  } else if (state.recipe.isFave) {
    // Remove the fave from the state and menu, then set the current recipe fave flag to false
    delFave(state.recipe.id);
    state.recipe.isFave = false;
    recipeView.renderFaveStatus(false); // Set the faveIcon
  }
};

// Handle fave deletions
const delFave = (faveID) => {
  state.faves.removeFave(faveID);
  favesView.removeFave(faveID);

  // If we have no faves left, restore placeholder
  if (state.faves.faveList.length === 0) {
    favesView.addPlaceholder();
  }
};

// Add event handler to the header menu faves list to handle deletions from there
document
  .getElementById(domStrings.menu__faves)
  .addEventListener('click', (event) => {
    // Check to see if a delete button has been clicked
    if (event.target.closest('.faves__del')) {
      // It has, so find out which one and proceed

      // Check which of the delete buttons has been clicked and grab id
      const faveToDel = event.target.closest('.faves__item').id;

      // Remove this fave from the state and menu
      delFave(faveToDel);

      // Then update the fave status on page if the fave we're deleting is the current displayed recipe
      if (state.recipe.id === faveToDel) {
        state.recipe.isFave = false;
        recipeView.renderFaveStatus(false);
      }
    } else if (event.target.closest(domStrings.faves__edit)) {
      console.log('Faves edit button clicked');
    } else if (event.target.closest(domStrings.faves__clear)) {
      state.faves.clear();
      favesView.clear();
    }
  });
