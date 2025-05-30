import { getSomeItems, getAllItems, getItemByID, getItemByName } from './get-functions.js'

const resultsList = document.getElementById('results-list')
const resultsTitle = document.getElementById('results-title')
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const categoryButtons = document.querySelectorAll('.category-button')

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