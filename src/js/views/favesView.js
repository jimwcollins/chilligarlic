/***************************
 *
 * CHILLI+GARLIC
 * VIEW: favesView.js
 *
 ***************************/

/***********
 * Imports
 ***********/

import { domStrings } from './base';

/***********
 * Functions
 ***********/

export const renderFave = (objFave) => {
  // Get the faves menu in the DOM
  const faveList = document.getElementById(domStrings.faves__list);

  const htmlFave = `
        <li class="menu__dropdown__item faves__item" id="${objFave.id}">
            <a href="recipe.html?rID=${objFave.id}" class="faves__item__link">
                <figure class="faves__item__figure">
                    <img src="${objFave.imageUrl}" alt="" class="faves__item__img">
                </figure>
                <div class="faves__details">
                    <p class="faves__details__title">${objFave.title}</p>
                    <p class="faves__details__author">${objFave.author}</p>
                </div>
            </a>
            <svg class="menu__dropdown__del faves__item__del">
                <use xlink:href="img/Chilli_Icons_Sprite.svg#icon-circle-with-cross"></use>
            </svg>
        </li>  
    `;

  faveList.insertAdjacentHTML('beforeend', htmlFave);
};

// Remove fave from UI
export const removeFave = (faveID) => {
  // First get the element to be removed
  const faveToDel = document.getElementById(faveID);
  faveToDel.parentElement.removeChild(faveToDel);
};

export const removePlaceholder = () => {
  if (
    document.getElementById(domStrings.faves__placeholder).style.display !==
    'none'
  ) {
    document.getElementById(domStrings.faves__placeholder).style.display =
      'none';
  }
};

export const addPlaceholder = () => {
  document.getElementById(domStrings.faves__placeholder).style.display = '';
};

export const clear = () => {
  document.getElementById(domStrings.faves__list).innerHTML = '';
  addPlaceholder();
};
