/***************************
* 
* CHILLI+GARLIC
* MODEL: Search.js
* 
***************************/

/***************************
*
* Search object 
*   Method: getResults
*   Properties: 
*       query: search string
*       result: the search result
*
****************************/


// Use Axios to simplify HTTP requests
import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    // getResults function. As it's async, it will return a Promise.
    async getResults() {
        
        try {
            const ajaxResult = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = ajaxResult.data.recipes;
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
