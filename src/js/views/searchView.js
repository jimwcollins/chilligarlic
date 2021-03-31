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
export const renderResults = (query, results, numRetrieved, numTotal, page) => {
  renderTitle(query, numRetrieved, numTotal, page);

  // If there are any results to render...
  if (results) {
    // Call the renderItem method for each of the search results
    results.forEach(renderItem);
  }
};

// Display the query as the title of the search results page
const renderTitle = (query, numRetrieved, numTotal, page) => {
  // Insert title info into the DOM if this is our first time displaying the results
  if (page === 1) {
    document.querySelector(
      domStrings.searchResultsTitle
    ).innerHTML = capitalize(query);
  }

  document.querySelector(
    domStrings.searchResultsStatus
  ).innerHTML = `Showing ${numRetrieved} of ${numTotal} results`;
};

const renderItem = (item) => {
  // Construct html with info from our search
  const item_HTML = `
        <a href="recipe.html?rID=${item.id}&return=true" class="search-results__link">
            <figure class="search-results__item">
                <img src="${item.image}" class="search-results__img">
            </figure>
            <p class="search-results__text">${item.title}</p>
        </a>
    `;

  // Now insert the html into the searh results grid in the DOM
  document
    .querySelector(domStrings.searchResultsGrid)
    .insertAdjacentHTML('beforeend', item_HTML);
};
