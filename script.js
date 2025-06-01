import { getSomeObjects, getAllObjects, getObjectByID, getObjectByName } from './get-functions.js'
/* Import flavor images and flavor quotes */
import { hyrulianQuoteAndAuthor, pixelImageList } from './quotes.js'

const titleImages = document.querySelectorAll('.title-images')

const resultsList = document.querySelector('.results-list')
const resultsTitle = document.querySelector('.results-title')
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const categoryButtons = document.querySelectorAll('.category-button')

const quoteContainer = document.getElementById('quote-container')
const zeldaQuote = document.getElementById('zelda-quote')
const zeldaQuoteAuthor = document.getElementById('zelda-quote-author')
const zeldaQuoteGame = document.getElementById('zelda-quote-game')
const quoteButton = document.getElementById('quote-button')


// Display a random Hyrulian quote and a random Rupee color on page load

/* Global variable to set loaded category, to  swap between detail.js base containers */
let currentCategory


window.addEventListener('load', async () => {
    console.log('PAGE IS LOADED')
    console.log('===================')
    loadRandomImage(pixelImageList, titleImages)
    loadRandomQuote()
})

quoteButton.addEventListener('click', function () {
    loadRandomQuote()
})

/* Each button will pull results from the Zelda API of the related category */
/* KNOWN BUG: Clicking two category buttons at the same time before one loads results in a combined list of results,
Find out how to clear the list in progress BEFORE allowing reclick.
Check get-functions.js */
for (let button of categoryButtons) {

    button.addEventListener('click', async function () {

        clearResults()
        console.log(`Category button clicked: ${button.textContent}`)

        /* Clear previous screen */
        
        let category = button.textContent.toLowerCase()
        currentCategory = button.textContent.toLowerCase() /* Sets current category for detail.js */

        let objects = await getAllObjects(category, resultsTitle)
        
        /* Loads all objects from the API pull into a list */
        for (let object of objects) {
            appendObjectToList(object, currentCategory, resultsList)
        }

    })
}

/* Cleans the screen lol */
function clearResults() {
    resultsList.innerHTML = ''
}

/* Returns a random number between 0 and the length of given array */
/* Used for randomizing flavor text and images for website */
function randNum(maxNum) {

    let randIndex = Math.floor(Math.random() * maxNum) 
    return randIndex

}

/* Loads random quote on the page */
function loadRandomQuote() {
    let randomQuote = randNum(hyrulianQuoteAndAuthor.length)
    zeldaQuote.textContent = hyrulianQuoteAndAuthor[randomQuote].quote
    zeldaQuoteAuthor.textContent = hyrulianQuoteAndAuthor[randomQuote].author
    zeldaQuoteGame.textContent = hyrulianQuoteAndAuthor[randomQuote].game
    if (quoteButton.textContent === ``)
        quoteButton.textContent = 'Reload quote'
}

/* Loads random images next to to title text */
function loadRandomImage(imageList, imageElements) {
        for (let image of imageElements) {
            let randomPixelImage = randNum(imageList.length)
            image.src = imageList[randomPixelImage]
        }
}

/* Maps the names of a list of objects, enables link clicking = Clicking on the name will load up that object via its ID */
/*  attaches an event listener to each one to pull it's API ID */
function appendObjectToList(object, category, objectsListElement) {
    let listItem = document.createElement('li')
    listItem.classList.add('result-object')
    listItem.innerHTML = `<a href="detail.html">${object.name}</a>`
    listItem.addEventListener('click', function () {
        loadUpObject(object.id, object.name, category)
    })
    objectsListElement.appendChild(listItem)
}

/* Captures the ID, name, and Category of a selected object before sending user to detail.html */

function loadUpObject(objectID, objectName, objectCategory) {

    console.log(`Clicked on object: ${objectName}`)
    console.log(`Object ID: ${objectID}`)
    console.log(`Object category: ${objectCategory}`)
    localStorage.setItem('loadedObjectID', objectID)
    localStorage.setItem('loadedObjectName', objectName)
    localStorage.setItem('loadedObjectCategory', objectCategory)
    /* Allows the object's ID and category to be passed onto a data.js file (Name later) */
}

export { randNum, loadRandomQuote, loadRandomImage, titleImages, loadUpObject, appendObjectToList }