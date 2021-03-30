/***************************
* 
* CHILLI+GARLIC
* MODEL: Faves.js
* 
***************************/

/***************************
*
* Faves object 
*   Methods: 
*       isFave(recipeID)
*       persistFaves()
*       restoresFaves()
*       addFave
*       removeFave
*   Properties: 
*       faveList: array of fave objects
*           objFave:
*               id
*               title
*               author
*               imageUrl
*
****************************/

export default class Faves {

    constructor() {
        this.faveList = [];
    }

    // Determine if specified recipe is in FaveList
    isFave(recipeID) {
        const faveIndex = this.faveList.findIndex(objFave => objFave.id === recipeID);

        return faveIndex !== -1 ? true : false; 
    }

    // Add recipe to Faves list
    addFave(newFave) {
        this.faveList.push(newFave);

        // Persist the updated fave list in local storage
        this.persistFaves();
    }

    // Remove recipe from Faves list
    removeFave(recipeID) {
        // Find the entry in the array for this id and remove it with splice
        const indexToDel = this.faveList.findIndex(objFave => objFave.recipeID === recipeID);

        this.faveList.splice(indexToDel, 1);

        // Persist the updated fave list in local storage
        this.persistFaves();
    }

    // Clear all faves
    clear() {
        this.faveList = [];

        // Persist the updated fave list in local storage
        this.persistFaves();
    }

    // Persist the search object by turning it into a string and storing in session storage
    persistFaves() {
        localStorage.setItem('faves', JSON.stringify(this.faveList));
    }

    // Retrieve search from storage, parse then restore search object details
    restoreFaves() {
        const arrLocalFaves = JSON.parse(localStorage.getItem('faves'));

        // If the retrieved fave list is not null or 0, restore to current Faves object
        if (arrLocalFaves && arrLocalFaves.length > 0) {
            this.faveList = arrLocalFaves;
        }
    }
}