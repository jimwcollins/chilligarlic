/***************************
 *
 * CHILLI+GARLIC
 * CONTROLLER: searchController.js
 *
 ***************************/

import { domStrings } from '../views/base';
import * as searchView from '../views/searchView';
import Search from '../models/Search';

// Handle the search
export const ctrlSearch = async () => {
  // Get search input (from url)
  const query = searchView.getSearchInput();

  // Create search object
  if (query) {
    // If we have a query in URL, create search object from that then retrieve results
    state.search = new Search(query);

    try {
      // Search for recipes asynchronously. Await the Promise before proceeding.
      await state.search.getResults();
    } catch (error) {
      alert('Something went wrong with the search...');
    }
  } else {
    // There is no query so attempt to retrieve a saved search
    state.search = new Search('');
    state.search.restore();
  }

  // Now persist the search object
  state.search.persist();

  // Render results on UI
  searchView.renderResults(
    state.search.query,
    state.search.allResults,
    state.search.numRetrieved,
    state.search.numTotal,
    state.search.page
  );

  // Set up infinite scroll
  const resultsEnd = document.querySelector(domStrings.footer);

  const resultsObserver = new IntersectionObserver(handleResultsScroll, {
    root: null,
    threshold: 1,
  });

  resultsObserver.observe(resultsEnd);
};

const handleResultsScroll = ([entry]) => {
  // Only fetch more results if we've reached the end
  // AND we've not retrieved all results already
  if (entry.isIntersecting && !state.search.allRetrieved) {
    ctrlFetchMoreResults();
  }
};

const ctrlFetchMoreResults = async () => {
  const page = state.search.page + 1;

  try {
    console.log('Finding results for page:', page);
    await state.search.getResults(page);
  } catch (error) {
    alert('Something went wrong with the search...');
  }

  state.search.persist();
  searchView.renderResults(
    state.search.query,
    state.search.currResults,
    state.search.numRetrieved,
    state.search.numTotal,
    state.search.page
  );
};
