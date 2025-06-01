import { getSomeObjects, getAllObjects, getObjectByID, getObjectByName, getObjectByLink } from './get-functions.js'
import { hyrulianQuoteAndAuthor, pixelImageList } from './quotes.js'
import { loadRandomImage, loadRandomQuote, titleImages, loadUpObject } from './script.js'

/* IDK if I'd use the DOM elements from the previous page */

/* Local storage variables, to ensure correct object is loaded up */
let selectedObjectID = localStorage.getItem('loadedObjectID')
let selectedObjectName = localStorage.getItem('loadedObjectName')
let selectedObjectCategory = localStorage.getItem('loadedObjectCategory')

/* DOM ELEMENTS */

const searchResultName = document.getElementById('search-result-name')
const searchResultId = document.getElementById('search-result-id')
const searchResultDescription = document.getElementById('search-result-description')

const relatedGamesList = document.getElementById('related-games-list')
const relatedDungeonsList = document.getElementById('related-dungeons-list')
const relatedCharactersList = document.getElementById('related-characters-list')

window.addEventListener('load', async () => {
    loadRandomImage(pixelImageList, titleImages)
    loadRandomQuote()
    console.log('PAGE IS LOADED')
    console.log('loading data ...')
    console.log('===================')

    
    /* Console logs to confirm data was selected */
    console.log('Selected object ID:', selectedObjectID)
    console.log('Selected object name:', selectedObjectName)
    console.log('Selected object category:', selectedObjectCategory)

    console.log('===================')

    /* Fetches the object data */
    let objectData = await getObjectByID(selectedObjectCategory, selectedObjectID)
    console.log('Object data fetched:', objectData)

    console.log('===================')

    /* Log data directly from the API for verification */
    // console.log('Object Name:', objectData.name)
    // console.log('Object Description:', objectData.description)
    // console.log('Object ID:', objectData.id)

    renderObjectDetails(objectData, selectedObjectCategory)
    
})

function renderObjectDetails(object, category) {
    searchResultName.textContent = `${object.name} (${category})`
    searchResultId.textContent = `ID: ${object.id}`
    selectProperCategory(object, category)
    
}

function selectProperCategory(object, category) {

    if (category === 'games') {
        renderGameDetails(object)
    } else if (category === 'places') {
        renderPlaceDetails(object)
    } else if (category === 'dungeons') {
        renderDungeonDetails(object)
    } else if (category === 'characters') {
        renderCharacterDetails(object)
    } else if (category === 'bosses') {
        renderBossDetails(object)
    } else if (category === 'monsters') {
        renderMonsterDetails(object)
    } else if (category === 'staff') {
        renderStaffDetails(object)
    } else if (category === 'items') {
        renderItemDetails(object)
    } else {
        alert(`You've met with a terrible fate, haven't you?`)
        console.error(`Unknown category: ${category}. Cannot render details.`)
    }
}

function renderGameDetails(object) {
    searchResultDescription.textContent = object.description || '[No description available]'
}

function renderPlaceDetails(object) {
    searchResultDescription.textContent = object.description || '[No description available]'
    renderRelatedGames(object.appearances)
    renderRelatedCharacters(object.inhabitants)
}

function renderDungeonDetails(object) {
    searchResultDescription.textContent = object.description || '[No description available]'
    renderRelatedGames(object.appearances)
}

function renderCharacterDetails(object) {
    searchResultDescription.textContent = object.description || '[No description available]'
    renderRelatedGames(object.appearances)
}

function renderBossDetails(object) {
    searchResultDescription.textContent = object.description || '[No description available]'
    renderRelatedGames(object.appearances)
    renderRelatedDungeons(object.dungeons)
}

function renderMonsterDetails(object) {
    searchResultDescription.textContent = object.description || '[No description available]'
    renderRelatedGames(object.appearances)
}

function renderStaffDetails(object) {
    renderRelatedGames(object.worked_on)
}

function renderItemDetails(object) {
    searchResultDescription.textContent = object.description || '[No description available]'
    renderRelatedGames(object.games)
}

async function renderRelatedDungeons(dungeonLinks) {
    for (let dungeonLink of dungeonLinks) {
        let dungeonElement = document.createElement('li')
        let dungeonData = await getObjectByLink(dungeonLink)
        dungeonElement.innerHTML = `<a href="detail.html">${dungeonData.name}</a>` || '[No name available]'
        /* Must attach even listener to each individual object for some reason lmao */
        dungeonElement.addEventListener('click', function () {
            let tempCategory = 'dungeons'
            loadUpObject(dungeonData.id, dungeonData.name, tempCategory)
        })
        relatedDungeonsList.appendChild(dungeonElement)
    }
}

async function renderRelatedGames(gameLinks) {
    for (let gameLink of gameLinks) {
        let gameElement = document.createElement('li')
        let gameData = await getObjectByLink(gameLink)
        gameElement.innerHTML = `<a href="detail.html">${gameData.name}</a>` || '[No name available]'
        /* Must attach even listener to each individual object for some reason lmao */
        gameElement.addEventListener('click', function () {
            let tempCategory = 'games'
            loadUpObject(gameElement.id, gameElement.name, tempCategory)
        })
        relatedGamesList.appendChild(gameElement)
    }
}

async function renderRelatedCharacters(characterLinks) {
    for (let characterLink of characterLinks) {
        let characterElement = document.createElement('li')
        let characterData = await getObjectByLink(characterLink)
        characterElement.innerHTML = `<a href="detail.html">${characterData.name}</a>` || '[No name available]'
        /* Must attach even listener to each individual object for some reason lmao */
        characterElement.addEventListener('click', function () {
            let tempCategory = 'characters'
            loadUpObject(characterData.id, characterData.name, tempCategory)
        })
        relatedCharactersList.appendChild(characterElement)
    }
}