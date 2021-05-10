/***************************
 *
 * CHILLI+GARLIC
 * VIEW: shopListView.js
 *
 ***************************/

import { domStrings } from './base';

export const renderList = (list) => {
  // Grab the list in the DOM for both desktop and mobile views
  const domShopLists = document.querySelectorAll(domStrings.shopList__list);

  domShopLists.forEach((shopList) => {
    list.forEach((aisleList) => renderAisleList(shopList, aisleList));
  });
};

const renderAisleList = (domShopList, aisleList) => {
  const aisleListHtml = /* html */ `
    <ul class='shoplist__aisleList' id='aisleList__${aisleList.aisle}'>
      <li class='shoplist__aisleTitle'>${aisleList.aisle}</li>
    </ul>
  `;

  domShopList.insertAdjacentHTML('beforeend', aisleListHtml);

  const domAisleList = domShopList.querySelector(
    `#aisleList__${CSS.escape(aisleList.aisle)}`
  );
  aisleList.aisleList.forEach((item) => renderItem(domAisleList, item));
};

const renderItem = (domAisleList, item) => {
  // Set up our HTML
  const itemHtml = /* html */ `
        <li class="menu__dropdown__item shoplist__item" data-item_id=${item.id}>
            <p class="shoplist__text shoplist__quantity">${item.quantity}${item.unit}</p>
            <p class="shoplist__text shoplist__ingredient">${item.ingredient}</p>
            <svg class="menu__dropdown__del list__del">
                <use xlink:href="img/Chilli_Icons_Sprite.svg#icon-circle-with-cross"></use>
            </svg>
        </li>
    `;
  domAisleList.insertAdjacentHTML('beforeend', itemHtml);
};

// Remove entire aisle if it's final item in it
export const removeItem = (item, removeAisle) => {
  if (removeAisle) {
    const aisle = item.parentElement;
    aisle.parentElement.removeChild(aisle);
  } else {
    item.parentElement.removeChild(item);
  }
};

export const removePlaceholder = () => {
  const placeholders = document.querySelectorAll(
    domStrings.shopList__placeholder
  );

  placeholders.forEach((placeholder) => {
    if (placeholder.display !== 'none') placeholder.style.display = 'none';
  });
};

export const addPlaceholder = () => {
  const placeholders = document.querySelectorAll(
    domStrings.shopList__placeholder
  );

  placeholders.forEach((placeholder) => {
    placeholder.style.display = 'block';
  });
};

export const clear = () => {
  const domShopLists = document.querySelectorAll(domStrings.shopList__list);

  domShopLists.forEach((shopList) => {
    shopList.innerHTML = '';
    addPlaceholder();
  });
};
