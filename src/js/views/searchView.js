/***************************
 *
 * CHILLI+GARLIC
 * VIEW: searchView.js
 *
 ***************************/

/***********
 * Imports
 ***********/

import { domStrings, domElements, capitalize } from './base';

/***********
 * Functions
 ***********/

// Get search input from URL after form submit
export const getSearchInput = () => {
  // Get search params using URLSearchParams
  const searchParams = new URLSearchParams(location.search);

  // Get the search string and return it
  return searchParams.get('search');
};

// Render the search results
export const renderResults = (query, results) => {
  // First render the query as the title of the page
  renderTitle(query, results.length);

  // If there are any results to render...
  if (results) {
    // Call the renderItem method for each of the search results
    results.forEach(renderItem);
  }
};

// Display the query as the title of the search results page
export const renderTitle = (query, numResults) => {
  // Construct title HTML using query text and number of results
  // Call capitalize function on query
  const titleHTML = `
        <h1 class="heading--main">${capitalize(query)}</h1>
        <p class="heading--subtitle">Showing ${numResults} results</p>
    `;

  // Insert title info into the DOM
  document
    .querySelector(domStrings.searchResultTitle)
    .insertAdjacentHTML('beforeend', titleHTML);
};

const renderItem = (item) => {
  // Construct html with info from our search
  const item_HTML = `
        <a href="recipe.html?rID=${item.id}&return=true" class="search-results__link" href="${item.recipe_id}">
            <figure class="search-results__item">
                <img src="${item.image}" class="search-results__img">
            </figure>
            <p class="search-results__text">${item.title}</p>
        </a>
    `;

  // Now insert the html into the searh results grid in the DOM
  document
    .querySelector(domStrings.searchResultGrid)
    .insertAdjacentHTML('beforeend', item_HTML);
};
