/***************************
 *
 * CHILLI+GARLIC
 * VIEW: recipeView.js
 *
 ***************************/

/***********
 * Imports
 ***********/

import { domStrings } from './base';

/***********
 * Functions
 ***********/

// Get recipe ID from URL
export const getRecipeParams = () => {
  // Get search params using URLSearchParams
  const searchParams = new URLSearchParams(location.search);

  const objParams = {
    recipeID: searchParams.get('rID'),
    returnStatus: searchParams.get('return'),
  };

  // Get the search string and return it
  return objParams;
};

// Get return status - have we come from search page, and need to display back button
export const getReturn = () => {
  // Get search params using URLSearchParams
  const searchParams = new URLSearchParams(location.search);

  // Get the search string and return it
  return searchParams.get('rID');
};

export const renderRecipe = (recipe) => {
  if (recipe.returnStatus)
    document.querySelector(domStrings.headerBack).style.display = 'flex';

  document
    .getElementById(domStrings.recipeTitle)
    .insertAdjacentHTML('beforeend', recipe.title);

  document
    .getElementById(domStrings.recipeAuthor)
    .insertAdjacentHTML('beforeend', recipe.author);

  const recipeImage = document.querySelector(domStrings.image__hero);
  recipeImage.setAttribute('src', recipe.imageUrl);

  document
    .getElementById(domStrings.recipeTime)
    .insertAdjacentHTML('beforeend', `${recipe.time} minutes`);

  renderServings(recipe.servings);
  renderFaveStatus(recipe.isFave);
  renderIngredients(recipe.ingredients);
  renderListStatus(recipe.ingsAdded);
  renderInstructions(recipe.instructions);
};

export const renderNewIngredients = (servings, ingredients) => {
  // 1. Change the servings displayed in the UI
  renderServings(servings);

  // 2. Loop through all the quantities in the ingredients list and update
  const quantities = document.querySelectorAll('.ingredients__list__quantity');

  quantities.forEach((quantity, index) => {
    quantity.textContent = ingredients[index].quantity;
  });
};

const renderServings = (servings) => {
  const htmlServings =
    servings === 1 ? `${servings} serving` : `${servings} servings`;
  document.getElementById(domStrings.recipeServings).textContent = htmlServings;
};

const renderIngredients = (ingredients) => {
  const ingredientList = document.getElementById(domStrings.ingredients);

  // Our ingredients come as an array of objects so loop through and display each one
  ingredients.forEach((ingredient) => {
    const htmlIng = `<li><span class='ingredients__list__quantity'>${ingredient.quantity}</span> ${ingredient.unit} ${ingredient.ingredient}</li>`;
    ingredientList.insertAdjacentHTML('beforeend', htmlIng);
  });
};

const renderInstructions = (instructions) => {
  const steps = document.querySelector(domStrings.method);

  instructions.forEach((topStep) => {
    if (topStep.subhead)
      steps.insertAdjacentHTML(
        'beforeend',
        `<li class='method__subHead'>${topStep.subhead}</li>`
      );

    topStep.steps.forEach((subStep) => {
      steps.insertAdjacentHTML(
        'beforeend',
        `<li class='method__step'>
          <span class='method__step__num'>${subStep.number}</span>
          <span class='method__step__text'>${subStep.step}</span>
        </li>`
      );
    });
  });
};

// Set the fave icon and text according to fave status
export const renderFaveStatus = (isFave) => {
  // First target the fave elements in the DOM
  const faveSvg = document.querySelector('.faves__svg');
  const nonFaveText = document.querySelector('.faves__nonFaveText');
  const faveText = document.querySelector('.faves__faveText');

  if (isFave) {
    // This is a fave so add the fave class to display the isFave SVG
    faveSvg.classList.add('faves--isFave');

    // Display the favourite text and hide the non-fave text
    faveText.style.display = 'block';
    nonFaveText.style.display = 'none';
  } else {
    faveSvg.classList.remove('faves--isFave');

    // Display the non-fave text and hide the fave text
    faveText.style.display = 'none';
    nonFaveText.style.display = 'block';
  }
};

// Set the list icon and text according to added to list status
export const renderListStatus = (ingsAdded) => {
  // First target the fave elements in the DOM
  const listIcon = document.querySelector(domStrings.ingredientsIcon);
  const listSvg = document.querySelector(domStrings.ingredientsSvg);
  const nonListText = document.querySelector(
    '.ingredients__nonListTextContainer'
  );
  const listText = document.querySelector('.ingredients__listTextContainer');

  if (ingsAdded) {
    // This has been added to list so display the isOnList SVG
    listIcon.classList.add('ingredients__icon--isOnList');
    listSvg.classList.add('ingredients__svg--isOnList');

    // Display the favourite text and hide the non-fave text
    listText.style.display = 'block';
    nonListText.style.display = 'none';
  } else {
    listIcon.classList.remove('ingredients__icon--isOnList');
    listSvg.classList.remove('ingredients__svg--isOnList');

    // Display the non-fave text and hide the fave text
    listText.style.display = 'none';
    nonListText.style.display = 'block';
  }
};
