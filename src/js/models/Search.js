/***************************
 *
 * CHILLI+GARLIC
 * MODEL: Search.js
 *
 ***************************/

import { searchRecipes } from './Api';

export default class Search {
  constructor(query) {
    this.query = query;
    this.allResults = [];
    this.currResults = [];
    this.numRetrieved = 0;
    this.numTotal = 0;
    this.allRetrieved = false;
  }

  // getResults function. As it's async, it will return a Promise.
  async getResults(page = 1) {
    try {
      this.page = page;
      const result = await searchRecipes(this.query, this.page);

      this.currResults = result.results;
      this.allResults.push(...result.results);
      this.numRetrieved += result.results.length;
      if (page === 1) this.numTotal = result.totalResults;
      if (this.numRetrieved === this.numTotal) this.allRetrieved = true;
    } catch (error) {
      alert(error);
    }
  } // End getResults method

  // Persist the search object by turning it into a string and storing in session storage
  persist() {
    sessionStorage.setItem('search', JSON.stringify(this));
  }

  // Retrieve search from storage, parse then restore search object details
  restore() {
    const objTempSearch = JSON.parse(sessionStorage.getItem('search'));

    this.query = objTempSearch.query;
    this.result = objTempSearch.result;
  }
} // End Search class
