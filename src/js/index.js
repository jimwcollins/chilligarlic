/***************************
* 
* CHILLI+GARLIC
* CONTROLLER: index.js
* 
***************************/

/***********
* Imports
***********/

// SCSS
import '../sass/main.scss';

// JS
import { domStrings, domElements } from './views/base';
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import Faves from './models/Faves';
import * as favesView from './views/favesView';
import ShopList from './models/ShopList';
import * as shopListView from './views/shopListView';


/**************
* Initial code
**************/

// Global state of the app
// includes Search object, current Recipe object, shopping list object, liked recipes
const state = {};

// TESTING
window.state = state;

// Add event listener upon page load, then check which page we're on
window.addEventListener('load', () => {

    // Initialise faves and shopping list and restore from storage if possible
    initFaves();
    initShopList();

    if (location.pathname === domStrings.searchPage) {
        // If we're on the search results page, set the state then call ctrlSearch function
        ctrlSearch();
    } else if (location.pathname === domStrings.recipePage) {
        // If we're on the recipe page, call ctrlRecipe function
        ctrlRecipe();
    }
});



/*******************
* Search Controller
*******************/

// Handle the search
const ctrlSearch = async () => {

    // Get search input (from url)
    const query = searchView.getSearchInput();
    
    // Create search object
    if (query) {
        // If we have a query in URL, create search object from that then retrieve results
        state.search = new Search(query);

        try {
            // Search for recipes asynchronously. Await the Promise before proceeding.
            await state.search.getResults();
        } catch(error) {
            alert('Something went wrong with the search...');
        }

    } else {
        console.log('Retrieving old search');
        // There is no query so attempt to retrieve a saved search
        state.search = new Search('');
        state.search.restore();
    }

    // Now persist the search object
    state.search.persist();

    // Render results on UI
    searchView.renderResults(state.search.query, state.search.result);

}


/*******************
* Recipe Controller
*******************/

const ctrlRecipe = async () => {

    // 0. Add recipe event listeners
    ctrlAddRecipeListeners();

    // 1. Get params and set recipe ID and return status
    const objParams = recipeView.getRecipeParams();

    const recipeID = objParams.recipeID;

    if (recipeID) {
        // 2. Construct recipe object
        state.recipe = new Recipe(recipeID);
    
        try {
            // 3. Retrieve recipe details
            await state.recipe.getRecipe();

            // 4. Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // 5. Parse ingredients
            state.recipe.parseIngredients();

            // 6. Is it a fave? If so, set flag
            if (state.faves.isFave(recipeID)) {
                console.log('This is already a fave');
                state.recipe.isFave = true;
            }

            // 7. Set return status
            state.recipe.returnStatus = objParams.returnStatus;

            // 8. Render to UI
            recipeView.renderRecipe(state.recipe);

        } catch(error) {
            alert('Error retrieving recipe');
            console.log(error);
        }
    }
}

// Add event listeners if we're on the recipe page
const ctrlAddRecipeListeners = () => {

    // Event listener on recipe info sidebar to handle various events through delegation
    document.querySelector(domStrings.recipeInfo).addEventListener('click', event => {
    
        // Check which button has been clicked
        if (event.target.matches('.btn-serveDec, .btn-serveDec *')) {
            // We have matched the decrease servings button or any of its children
    
            // Only decrease servings if it is greater than 1
            if (state.recipe.servings > 1) {
                state.recipe.updateIngredients('dec');
                recipeView.renderNewIngredients(state.recipe.servings, state.recipe.ingredients);
            }
            
        } else if (event.target.matches('.btn-serveInc, .btn-serveInc *')) {
            // We have matched the increase servings button or any of its children

            state.recipe.updateIngredients('inc');
            recipeView.renderNewIngredients(state.recipe.servings, state.recipe.ingredients);
            
        } else if (event.target.closest(domStrings.recipeFaves)) {
            // They have clicked the favourite button
            ctrlFaves();
        } else if (event.target.closest(domStrings.recipeShopList)) {
            // They have clicked 'Add to Shopping List' button
            ctrlShopList();
        }
    });

    // Handle hovers on fave icon - display hover text
    document.querySelector(domStrings.recipeFaves).addEventListener('mouseenter', event => {
        document.querySelectorAll('.faves__text').forEach(el => el.classList.toggle('faves__text--visible'));
        document.querySelector(domStrings.recipeServingControl).classList.toggle('recipe-details__servings--active');
    });

    document.querySelector(domStrings.recipeFaves).addEventListener('mouseleave', event => {
        document.querySelectorAll('.faves__text').forEach(el => el.classList.toggle('faves__text--visible'));
        document.querySelector(domStrings.recipeServingControl).classList.toggle('recipe-details__servings--active');
    });

    // Handle hovers in document info box - display servings controls
    document.querySelector(domStrings.recipeDetails).addEventListener('mouseenter', event => {
        document.querySelector(domStrings.recipeServingControl).classList.toggle('recipe-details__servings--active');
    });

    document.querySelector(domStrings.recipeDetails).addEventListener('mouseleave', event => {
        document.querySelector(domStrings.recipeServingControl).classList.toggle('recipe-details__servings--active');
    });
}


/*******************
* Faves Controller
*******************/

// Initialise faves
const initFaves = () => {

    // Intialise Faves object
    state.faves = new Faves();

    // Restore from local storage if we can
    state.faves.restoreFaves();

    // Render complete fave list to menu if we have faves, else placeholder remains in place
    if (state.faves.faveList.length > 0) {
        favesView.removePlaceholder();
        state.faves.faveList.forEach(fave => favesView.renderFave(fave));
    }
}

// Handle the faves button
const ctrlFaves = () => {

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
            imageUrl: state.recipe.imageUrl
        }

        // Add the fave, set the current recipe fave flag to true, then re-render
        state.faves.addFave(newFave);
        state.recipe.isFave = true;
        favesView.renderFave(newFave);
        recipeView.renderFaveStatus(true); // Set the faveIcon
        
    } else if (state.recipe.isFave) {
        // Remove the fave from the state and menu, then set the current recipe fave flag to false
        delFave(state.recipe.id);
        state.recipe.isFave = false;
        recipeView.renderFaveStatus(false);  // Set the faveIcon
    }
}

// Handle fave deletions
const delFave = faveID => {
    state.faves.removeFave(faveID);
    favesView.removeFave(faveID);
    
    // If we have no faves left, restore placeholder
    if (state.faves.faveList.length === 0) {
        favesView.addPlaceholder();
    }
}

// Add event handler to the header menu faves list to handle deletions from there
document.getElementById(domStrings.menu__faves).addEventListener('click', event => {

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


/**************************
* Shopping List Controller
**************************/

// Initialise shopping list
const initShopList = () => {

    state.shopList = new ShopList();

    // Restore from local storage if we can
    state.shopList.restoreList();

    // Now render the list to the UI if it isn't empty
    if (state.shopList.list.length > 0) {
        shopListView.removePlaceholder();
        state.shopList.list.forEach(item => shopListView.renderItem(item));
    }
}

// Handle the 'Add to Shopping List' button
const ctrlShopList = () => {
    
    // 1. Add the current recipe's ingredients to the shopping list
    state.recipe.ingredients.forEach(ingredient => {
        state.shopList.addItem(ingredient.quantity, ingredient.unit, ingredient.ingredient);
    });

    // 2. Update the UI
    // If the placeholder is in place, remove it
    shopListView.removePlaceholder();

    state.shopList.list.forEach(item => {
        shopListView.renderItem(item);
    })
}

// Listener for shopping list
document.getElementById(domStrings.menu__shopList).addEventListener('click', event => {
    
    if (event.target.closest('.list__del')) {
        // They have clicked a delete button. Find out which item and delete it
        const itemToDel = event.target.closest('.shoplist__item');

        // Delete from state shopping list
        state.shopList.removeItem(itemToDel.dataset.item_id);

        // Delete from UI. Restore placeholder if this is the last item
        shopListView.removeItem(itemToDel);

        if (state.shopList.list.length === 0) {
            shopListView.addPlaceholder();
        }
    } else if (event.target.closest(domStrings.shopList__edit)) {
        console.log('Edit button clicked');
    } else if (event.target.closest(domStrings.shopList__clear)) {
        state.shopList.clear();
        shopListView.clear();
    }
});