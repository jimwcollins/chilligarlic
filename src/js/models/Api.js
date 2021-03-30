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

export const searchRecipes = async (query) => {
  const {
    data: { results },
  } = await recipeApi.get('recipes/complexSearch', {
    params: {
      query,
      apiKey,
    },
  });

  return results;
};
