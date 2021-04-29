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
  // Get the faves menu in the DOM for both desktop and mobile views
  const faveLists = document.querySelectorAll(domStrings.faves__list);

  const htmlFave = /*html*/ `
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

  // Now add faves for both views
  faveLists.forEach((list) => {
    list.insertAdjacentHTML('beforeend', htmlFave);
  });
};

// Remove fave from UI
export const removeFave = (faveID) => {
  // First get the element to be removed (both desktop and mobile)
  // We need to escape the ID has it's a numeric-only ID.
  const favesToDel = document.querySelectorAll(`#${CSS.escape(faveID)}`);
  favesToDel.forEach((faveToDel) => {
    faveToDel.parentElement.removeChild(faveToDel);
  });
};

export const removePlaceholder = () => {
  const placeHolders = document.querySelectorAll(domStrings.faves__placeholder);

  placeHolders.forEach((placeHolder) => {
    if (placeHolder.style.display !== 'none')
      placeHolder.style.display = 'none';
  });
};

export const addPlaceholder = () => {
  const placeHolders = document.querySelectorAll(domStrings.faves__placeholder);

  placeHolders.forEach((placeHolder) => {
    placeHolder.style.display = '';
  });
};

export const clear = () => {
  const faveLists = document.querySelectorAll(domStrings.faves__list);

  faveLists.forEach((list) => {
    list.innerHTML = '';
  });
  addPlaceholder();
};
