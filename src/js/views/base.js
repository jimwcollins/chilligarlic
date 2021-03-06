/***************************
 *
 * CHILLI+GARLIC
 * VIEW: Base.js
 *
 ***************************/

// Core repository of strings for important DOM elements
export const domStrings = {
  // Pages
  searchPage: '/searchResults.html',
  recipePage: '/recipe.html',

  // Hero image
  image__hero: '.image__hero',

  // Page elements
  header: '.header',
  headerBack: '.header__back',
  footer: '.footer',

  // Faves
  faves__menu: '.menu__faves',
  faves__list: '#faves__list',
  faves__edit: '#faves__edit',
  faves__clear: '#faves__clear',
  faves__placeholder: '#faves__placeholder',

  // Shopping list
  shopList__menu: '.menu__shopList',
  shopList__list: '#shopList__list',
  shopList__edit: '#shopList__edit',
  shopList__clear: '#shopList__clear',
  shopList__placeholder: '#shopList__placeholder',

  // Search Page
  searchResultsTitle: '.search-results__title',
  searchResultsStatus: '.search-results__status',
  searchResultsGrid: '.search-results__grid',

  // Recipe page elements
  recipeDetails: '.recipe-details',
  recipeTitle: 'recipe__title',
  recipeAuthor: 'recipe__author',
  recipeInfo: '.recipe-info',
  recipeTime: 'recipe__time',
  recipeServings: 'recipe__servings',
  recipeServingControl: '.recipe-details__servings',
  recipeFavesIcon: '.faves__icon',
  recipeFavesText: '.faves__text',
  ingredients: 'ingredients',
  ingredientsIcon: '.ingredients__icon',
  ingredientsSvg: '.ingredients__svg',
  ingredientsListText: '.ingredients__listText',
  method: '.method__steps',
};

export const domElements = {
  searchForm: document.getElementById('search'),
  searchID: document.getElementById('search-form'),
};

// Capitalise a string
export const capitalize = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};
