/***************************
* 
* CHILLI+GARLIC
* VIEW: shopListView.js
* 
***************************/

/***********
* Imports
***********/

import { domStrings } from './base';

/***********
* Functions
***********/

export const renderItem = item => {
    // Grab the list in the DOM
    const shopList = document.getElementById(domStrings.shopList__list);
    
    // Set up our HTML
    const html = `
        <li class="menu__dropdown__item shoplist__item" data-item_id=${item.id}>
            <p class="shoplist__text shoplist__quantity">${item.quantity}${item.unit}</p>
            <p class="shoplist__text shoplist__ingredient">${item.ingredient}</p>
            <svg class="menu__dropdown__del list__del">
                <use xlink:href="img/Chilli_Icons_Sprite.svg#icon-circle-with-cross"></use>
            </svg>
        </li>
    `
    shopList.insertAdjacentHTML('beforeend', html);
}

export const removeItem = item => {
    item.parentElement.removeChild(item);
}

export const removePlaceholder = () => {
    if (document.getElementById(domStrings.shopList__placeholder).style.display !== 'none') {
        document.getElementById(domStrings.shopList__placeholder).style.display = 'none';
    }
}

export const addPlaceholder = () => {
    document.getElementById(domStrings.shopList__placeholder).style.display = '';
}

export const clear = () => {
    document.getElementById(domStrings.shopList__list).innerHTML = '';
    addPlaceholder();
}