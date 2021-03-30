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
        returnStatus: searchParams.get('return')
    }
    
    // Get the search string and return it
    return objParams;
}

// Get return status - have we come from search page, and need to display back button
export const getReturn = () => {
    // Get search params using URLSearchParams
    const searchParams = new URLSearchParams(location.search);
    
    // Get the search string and return it
    return searchParams.get('rID');
}


export const renderRecipe = (objRecipe) => {
    
    // 1. Render header back button (or not) depending on return status
    if (objRecipe.returnStatus) document.querySelector(domStrings.headerBack).style.display = 'flex';

    // 2. Render title
    document.getElementById(domStrings.recipeTitle).insertAdjacentHTML('beforeend', objRecipe.title);

    // 3. Render author
    document.getElementById(domStrings.recipeAuthor).insertAdjacentHTML('beforeend', objRecipe.author);

    // 4. Render image by changing the background image in the CSS
    document.querySelector(domStrings.image__hero).style.backgroundImage = `url(${objRecipe.imageUrl})`;

    // 5. Render time
    document.getElementById(domStrings.recipeTime).insertAdjacentHTML('beforeend', `${objRecipe.time} minutes`);

    // 6. Render servings
    renderServings(objRecipe.servings);

    // 7. Render faves button and text
    renderFaveStatus(objRecipe.isFave);

    // 8. Render ingredients
    renderIngredients(objRecipe.ingredients);
}

export const renderNewIngredients = (servings, arrayIngredients) => {
    
    // 1. Change the servings displayed in the UI
    renderServings(servings);

    // 2. Loop through all the quantities in the ingredients list and update
    const quantities = document.querySelectorAll('.ingredients__list__quantity');
    
    quantities.forEach((quantity, index) => {
        quantity.textContent = arrayIngredients[index].quantity;
    });
}


const renderServings = servings => {
    const htmlServings = servings === 1 ? `${servings} serving` : `${servings} servings`; 
    document.getElementById(domStrings.recipeServings).textContent = htmlServings;
}


const renderIngredients = (arrayIngredients) => {

    // Our ingredients come as an array of objects so loop through and display each one
    arrayIngredients.forEach(objIngredient => {
        const htmlIng = `<li><span class='ingredients__list__quantity'>${objIngredient.quantity}</span> ${objIngredient.unit} ${objIngredient.ingredient}</li>`
        document.getElementById(domStrings.ingredients).insertAdjacentHTML('beforeend', htmlIng);
    });
}

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

}

