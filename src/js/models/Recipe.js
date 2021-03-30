/***************************
* 
* CHILLI+GARLIC
* MODEL: Recipe.js
* 
***************************/

/***************************
*
* Recipe object 
*   Methods: 
        getRecipe: retrieve recipe by AJAX and populate object 
        parseIngredients: standardise ingredients array and separate into quantities, units and text 
*   Properties: 
*       id: recipe ID
*       title: recipe title
*       author: recipe author
*       imageUrl: main image
*       ingredients: array of ingredient objects
*           -- ingredient object:
*               quantity
*               units
*               ingredient                
*       recipeUrl: original recipe source
*       servings
*       time
*
****************************/


// Use Axios to simplify HTTP requests
import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    // getResults function. As it's async, it will return a Promise.
    async getRecipe() {
        
        try {
            // Retrieve our recipe
            const ajaxResult = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            
            // Now set the recipe properties from this data
            this.title = ajaxResult.data.recipe.title;
            this.author = ajaxResult.data.recipe.publisher;
            this.imageUrl = ajaxResult.data.recipe.image_url;
            this.ingredients = ajaxResult.data.recipe.ingredients;
            this.recipeUrl = ajaxResult.data.recipe.source_url;
        } catch (error) {
            alert(error);
        }

    } // End getResults method


    // Calculate recipe cooking time
    calcTime() {

        // Calculate time by allocating 15 minutes for every 3 ingredients
        const numIngredients = this.ingredients.length;
        const ingredientSplit = numIngredients / 3;

        this.time = ingredientSplit * 15;

    }


    // Calculate servings
    calcServings() {
        this.servings = 4;
    }


    parseIngredients() {

        // Set up arrays for long and short versions of units
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        // Now perform parsing operations for every element in the ingredients array
        const newIngredients = this.ingredients.map(elIng => {

            // 1. Make all units uniform

            // Make all ingredients text lowercase
            // Use a let because we will be mutating this variable as we go
            let currentIngredient = elIng.toLowerCase();

            // Replace long units with short units.
            // Loop through each unit in unitsLong array.
            // If it finds that unit within the current ingredients, replace it with the entry in the equivalent position from unitsShort.
            unitsLong.forEach((unit, i) => {
                currentIngredient = currentIngredient.replace(unit, unitsShort[i]);
            });

            // 2. Remove brackets using a regular expression
            currentIngredient = currentIngredient.replace(/ *\([^)]*\) */g, ' ');

            // 3. Parse into count, unit and ingredient

            // First convert current ingredient into array by splitting it by a space
            const arrayIngredient = currentIngredient.split(' ');

            // Then we need to determine if there are units in this ingredient array using findIndex.
            // For each part of the array, we perform a test: is it included in the unitsShort array - i.e. is it a unit?
            // If so, findIndex will return the index of the position where that test turns out to be true.
            const unitIndex = arrayIngredient.findIndex(arrayElement => unitsShort.includes(arrayElement));

            // Initialise ingredient object
            let objIngredient;

            // There are a few posibilities to consider, using if/else statement
            if (unitIndex > -1) {
                // A unit has been found
                // We assume everything before the unit is the quantity so use slice to store all this in an array
                const arrayQuantity = arrayIngredient.slice(0, unitIndex);
                
                let quantity;
                
                // Two cases of units:
                // 1) 4 tbsp • 2) 2 1/2 tbsp

                if (arrayQuantity.length === 1) {
                    // 1) Just one number to the quantity so we can just take the first element of arrayIngredient
                    // To catch situations where we have 4-1/2, turn the - to + then use eval
                    quantity = eval(arrayIngredient[0].replace('-','+'));
                } else {
                    // 2) More than one number
                    // Take everything before the unitIndex and join it with the + sign. 
                    // Then use 'eval' to calculate it is a number, so eval('4+1/2') becomes 4.5.
                    quantity = eval(arrayIngredient.slice(0, unitIndex).join('+'));
                }

                objIngredient = {
                    quantity,
                    unit: arrayIngredient[unitIndex],
                    ingredient: arrayIngredient.slice(unitIndex+1).join(' ')
                }

            } else if (parseInt(arrayIngredient[0], 10)) {
                // There is no unit, but there is a number.
                // We assume if a number appears it will be at the beginning
                // parseInt will return a number in this instance, which will be coerced to true.
                
                objIngredient = {
                    quantity: parseInt(arrayIngredient[0], 10),
                    unit: '',
                    ingredient: arrayIngredient.slice(1).join(' ') // Entire array except 1st element, joined together
                }

            } else if (unitIndex === -1) {
                // There is no unit and no number in first position
                objIngredient = {
                    quantity: 1,
                    unit: '',
                    ingredient: currentIngredient
                }
            }

            return objIngredient;
        });

        // TESTING - save old ingredients
        this.oldIngredients = this.ingredients;

        // Set new ingredients to be the current ingredients
        this.ingredients = newIngredients;
    }

    // Update the ingredients
    updateIngredients(type) {

        // First update the servings
        const newServings = type === 'dec' ? this.servings -1 : this.servings + 1;

        // Calculate adjustment ratio
        const adjustRatio = newServings / this.servings;

        // Now loop through ingredients and amend quantities
        this.ingredients.forEach(objIngredient => {
            objIngredient.quantity *= adjustRatio;
        })

        // Change number of number in Recipe object
        this.servings = newServings;
    }

} // End Search class