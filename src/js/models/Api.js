/***************************
 *
 * CHILLI+GARLIC
 * MODEL: Api.js
 *
 ***************************/

import axios from 'axios';
import { apiKey } from './api-config';

const recipeApi = axios.create({
  baseURL: 'https://api.spoonacular.com/',
});

export const searchRecipes = async (query, page) => {
  const offset = (page - 1) * 9;

  const { data: result } = await recipeApi.get('recipes/complexSearch', {
    params: {
      query,
      apiKey,
      number: 9,
      offset,
    },
  });

  console.log('Results from API', result);

  return result;
};

export const fetchRecipe = async (recipeId) => {
  const { data: recipe } = await recipeApi.get(
    `recipes/${recipeId}/information`,
    {
      params: {
        apiKey,
      },
    }
  );

  console.log('Recipe from API', recipe);

  return recipe;
};
