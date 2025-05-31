import { getSomeItems, getAllItems, getItemByID, getItemByName } from './get-functions.js'
import { hyrulianQuoteAndAuthor } from './quotes.js'

const titleRupeeImage = document.querySelectorAll('.title-rupee-image')

const resultsList = document.getElementById('results-list')
const resultsTitle = document.getElementById('results-title')
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const categoryButtons = document.querySelectorAll('.category-button')

const quoteContainer = document.getElementById('quote-container')
const zeldaQuote = document.getElementById('zelda-quote')
const zeldaQuoteAuthor = document.getElementById('zelda-quote-author')
const zeldaQuoteGame = document.getElementById('zelda-quote-game')
const quoteButton = document.getElementById('quote-button')

const rupeeImageList = ['./images/green-rupee-1.png', './images/green-rupee-2.png', './images/orange-rupee.png']


// Display a random Hyrulian quote and a random Rupee color on page load
let randomRupee = randNum(rupeeImageList.length)
let randomQuote = randNum(hyrulianQuoteAndAuthor.length)


loadQuote(randomQuote)
quoteButton.addEventListener('click', function () {
    randomQuote = randNum(hyrulianQuoteAndAuthor.length)
    loadQuote(randomQuote)
})

for (let rupeeImage of titleRupeeImage) {
    rupeeImage.src = rupeeImageList[randomRupee]
}

for (let button of categoryButtons) {

    button.addEventListener('click', async function () {
        console.log(`Category button clicked: ${button.textContent}`)

        clearResults()
        let category = button.textContent.toLowerCase()

        let items = await getSomeItems(category, resultsTitle)
        
        for (let item of items) {
            let listItem = document.createElement('li')
            listItem.classList.add('result-item')
            listItem.innerHTML = `<a href="${category}-details.html">${item.name}</a>`
            resultsList.appendChild(listItem)
        }

        /* Here to allow user to link to a show page */
        let resultItems = document.querySelectorAll('.result-item')

        for (let resultItem of resultItems) {
            resultItem.addEventListener('click', async function () {
                let itemName = resultItem.textContent
                console.log(`Clicked on item: ${itemName}`)
            })
        }
    })
}



function clearResults() {
    resultsList.innerHTML = ''
}

/* Returns a random number between 0 and the length of given array */
/* Used for randomizing flavot text for website */
function randNum(maxNum) {

    let randIndex = Math.floor(Math.random() * maxNum) 
    return randIndex
}

function loadQuote(randomNumber) {
    zeldaQuote.textContent = hyrulianQuoteAndAuthor[randomNumber].quote
    zeldaQuoteAuthor.textContent = hyrulianQuoteAndAuthor[randomNumber].author
    zeldaQuoteGame.textContent = hyrulianQuoteAndAuthor[randomNumber].game
    if (quoteButton.textContent === ``)
        quoteButton.textContent = 'Reload quote'
}