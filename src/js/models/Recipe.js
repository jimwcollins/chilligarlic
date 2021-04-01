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

import { fetchRecipe } from './Api';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  // getResults function. As it's async, it will return a Promise.
  async getRecipe() {
    try {
      // Retrieve our recipe
      const recipe = await fetchRecipe(this.id);

      // Now set the recipe properties from this data
      this.title = recipe.title;
      this.author = recipe.sourceName;
      this.imageUrl = recipe.image;
      this.ingredients = this.parseIngredients(recipe.extendedIngredients);
      this.instructions = this.parseInstructions(
        recipe.analyzedInstructions[0].steps
      );
      this.time = recipe.readyInMinutes;
      this.servings = recipe.servings;
    } catch (error) {
      alert(error);
      console.log(error);
    }
  } // End getResults method

  // Extract what we need from the ingredients
  parseIngredients(ingredients) {
    return ingredients.map((ingredient) => ({
      quantity: this.parseAmount(
        ingredient.measures.metric.amount,
        ingredient.measures.metric.unitShort.toLowerCase()
      ),
      unit: this.parseUnit(ingredient.measures.metric.unitShort.toLowerCase()),
      ingredient: ingredient.name,
    }));
  }

  parseAmount(amountToParse, unitToParse) {
    if (unitToParse === 'g' || unitToParse === 'ml')
      return Math.round(amountToParse);
    else return Math.round((amountToParse + Number.EPSILON) * 100) / 100;
  }

  parseUnit(unitToParse) {
    const unitsToChange = ['kilogram', 'tbsps', 'tsps'];
    const unitsClean = ['kg', 'tbsp', 'tsp'];

    const indexToChange = unitsToChange.findIndex(
      (unit) => unit === unitToParse
    );

    if (indexToChange !== -1) return unitsClean[indexToChange];
    else return unitToParse;
  }

  parseInstructions(instructions) {
    return instructions.map((instruction) => instruction.step);
  }

  // Update the ingredients
  updateIngredients(type) {
    // First update the servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    // Calculate adjustment ratio
    const adjustRatio = newServings / this.servings;

    // Now loop through ingredients and amend quantities
    this.ingredients.forEach((objIngredient) => {
      objIngredient.quantity *= adjustRatio;
    });

    // Change number of number in Recipe object
    this.servings = newServings;
  }
} // End Search class
