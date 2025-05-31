import { getSomeItems, getAllItems, getItemByID, getItemByName } from './get-functions.js'
import { hyrulianQuoteAndAuthor } from './quotes.js'

/* IDK if I'd use the DOM elements from the previous page */

let selectedItemID = localStorage.getItem('loadedItemID')
let selectedItemName = localStorage.getItem('loadedItemName')

window.addEventListener('load', async () => {
    console.log('PAGE IS LOADED')
    console.log('===================')

    
    /* Console logs to confirm data and stuff */
    console.log('On the previous page, you selected:', selectedItemName)
    console.log('Selected item ID:', selectedItemID)
    console.log('Selected item name:', selectedItemName)
    console.log('Selecting data for', selectedItemID, 'with name:', selectedItemName)
    
})