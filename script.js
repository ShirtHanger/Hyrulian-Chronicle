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

for (let button of categoryButtons) {

    button.addEventListener('click', async function () {
        console.log(`Category button clicked: ${button.textContent}`)

        clearResults()
        let category = button.textContent.toLowerCase()

        let objects = await getAllObjects(category, resultsTitle)
        currentCategory = button.textContent.toLowerCase() /* Sets current category for detail.js */
        console.log(`MAKING SURE CATEGORY IS SET TO: ${currentCategory}`)
        
        /* Loads all objects from the API pull into a list, attaches an event listener to each one to pull it's API ID */
        for (let object of objects) {
            let listObject = document.createElement('li')
            listObject.classList.add('result-object')
            listObject.innerHTML = `<a href="detail.html">${object.name}</a>`
            /* Must attach even listener to each individual object for some reason lmao */
            listObject.addEventListener('click', function () {
                loadUpObject(object.id, object.name, currentCategory)
            })
            resultsList.appendChild(listObject)
        }

        /* Here to allow user to link to a show page */
        let resultObjects = document.querySelectorAll('.result-object')

    })
}



function clearResults() {
    resultsList.innerHTML = ''
}

/* Returns a random number between 0 and the length of given array */
/* Used for randomizing flavor text and images for website */
function randNum(maxNum) {

    let randIndex = Math.floor(Math.random() * maxNum) 
    return randIndex

}

function loadRandomQuote() {
    let randomQuote = randNum(hyrulianQuoteAndAuthor.length)
    zeldaQuote.textContent = hyrulianQuoteAndAuthor[randomQuote].quote
    zeldaQuoteAuthor.textContent = hyrulianQuoteAndAuthor[randomQuote].author
    zeldaQuoteGame.textContent = hyrulianQuoteAndAuthor[randomQuote].game
    if (quoteButton.textContent === ``)
        quoteButton.textContent = 'Reload quote'
}

function loadRandomImage(imageList, imageElements) {
        for (let image of imageElements) {
            let randomPixelImage = randNum(imageList.length)
            image.src = imageList[randomPixelImage]
        }
    }

function loadUpObject(objectID, objectName, objectCategory) {

    console.log(`Clicked on object: ${objectName}`)
    console.log(`Object ID: ${objectID}`)
    console.log(`Object category: ${objectCategory}`)
    localStorage.setItem('loadedObjectID', objectID)
    localStorage.setItem('loadedObjectName', objectName)
    localStorage.setItem('loadedObjectCategory', objectCategory)
    /* Allows the object's ID and category to be passed onto a data.js file (Name later) */
}

export { randNum, loadRandomQuote, loadRandomImage, titleImages, loadUpObject }