import { getSomeObjects, getAllObjects, getObjectByID, getObjectByName, getObjectByLink } from './get-functions.js'
import { hyrulianQuoteAndAuthor, pixelImageList } from './quotes.js'
import { loadRandomImage, loadRandomQuote, titleImages, loadUpObject, appendObjectToList } from './script.js'

/* IDK if I'd use the DOM elements from the previous page */

/* Local storage variables, to ensure correct object is loaded up */
let selectedObjectID = localStorage.getItem('loadedObjectID')
let selectedObjectName = localStorage.getItem('loadedObjectName')
let selectedObjectCategory = localStorage.getItem('loadedObjectCategory')

/* DOM ELEMENTS */

const searchResultName = document.getElementById('search-result-name')
const searchResultId = document.getElementById('search-result-id')
const searchResultDescription = document.getElementById('search-result-description')

/* const relatedGamesList = document.getElementById('related-games-list') */
const relatedDungeonsList = document.getElementById('related-dungeons-list')
/* const relatedCharactersList = document.getElementById('related-characters-list') */

const relatedObjectsContainer = document.getElementById('related-objects-container')

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

/* Checks the current category, and chooses the right function for data population based on that */
function selectProperCategory(object, category) {

    /* Lists to be passed into each function, so data filling can be done in a single loop and helper function */
    let categoryListForPlaces = ['games', 'characters']
    let categoryListForBosses = ['games', 'dungeons']
    let categoryList = ['games']

    if (category === 'games') {
        renderGameDetails(object)
    } else if (category === 'places') {
        renderPlaceDetails(object, categoryListForPlaces)
    } else if (category === 'dungeons') {
        renderDungeonDetails(object, categoryList)
    } else if (category === 'characters') {
        renderCharacterDetails(object, categoryList)
    } else if (category === 'bosses') {
        renderBossDetails(object, categoryListForBosses)
    } else if (category === 'monsters') {
        renderMonsterDetails(object, categoryList)
    } else if (category === 'staff') {
        renderStaffDetails(object, categoryList)
    } else if (category === 'items') {
        renderItemDetails(object, categoryList)
    } else {
        alert(`You've met with a terrible fate, haven't you?`)
        console.error(`Unknown category: ${category}. Cannot render details.`)
    }
}

function renderGameDetails(object) {
    searchResultDescription.textContent = object.description || '[No description available]'
}

function renderPlaceDetails(object, categoryList) {
    searchResultDescription.textContent = object.description || '[No description available]'

    /* Creates, then fills, a block for each related game/dungeon/character for this specific object */
    appendRelatedObjectBlock(categoryList)

    /* Define each DOM variable created in the above function for immediete use */
    let relatedGamesList = document.getElementById('related-games-list')
    let relatedCharactersList = document.getElementById('related-characters-list')

    renderRelatedObjects(object.appearances, 'games', relatedGamesList)
    renderRelatedObjects(object.inhabitants, 'characters', relatedCharactersList)
}

function renderDungeonDetails(object, categoryList) {
    searchResultDescription.textContent = object.description || '[No description available]'

    /* Creates, then fills, a block for each related game/dungeon/character for this specific object */
    appendRelatedObjectBlock(categoryList)
    /* Define each DOM variable created in the above function for immediete use */
    let relatedGamesList = document.getElementById('related-games-list')

    renderRelatedObjects(object.appearances, 'games', relatedGamesList)
}

function renderCharacterDetails(object, categoryList) {
    searchResultDescription.textContent = object.description || '[No description available]'

    /* Creates, then fills, a block for each related game/dungeon/character for this specific object */
    appendRelatedObjectBlock(categoryList)
    /* Define each DOM variable created in the above function for immediete use */
    let relatedGamesList = document.getElementById('related-games-list')

    renderRelatedObjects(object.appearances, 'games', relatedGamesList)
}

function renderBossDetails(object, categoryList) {
    searchResultDescription.textContent = object.description || '[No description available]'

    /* Creates, then fills, a block for each related game/dungeon/character for this specific object */
    appendRelatedObjectBlock(categoryList)
    /* Define each DOM variable created in the above function for immediete use */
    let relatedGamesList = document.getElementById('related-games-list')
    let relatedDungeonsList = document.getElementById('related-dungeons-list')

    renderRelatedObjects(object.appearances, 'games', relatedGamesList)
    renderRelatedObjects(object.dungeons, 'dungeons', relatedDungeonsList)
}

function renderMonsterDetails(object, categoryList) {
    searchResultDescription.textContent = object.description || '[No description available]'

    /* Creates, then fills, a block for each related game/dungeon/character for this specific object */
    appendRelatedObjectBlock(categoryList)
    /* Define each DOM variable created in the above function for immediete use */
    let relatedGamesList = document.getElementById('related-games-list')

    renderRelatedObjects(object.appearances, 'games', relatedGamesList)
}

function renderStaffDetails(object, categoryList) {

    /* Creates, then fills, a block for each related game/dungeon/character for this specific object */
    appendRelatedObjectBlock(categoryList)
    /* Define each DOM variable created in the above function for immediete use */
    let relatedGamesList = document.getElementById('related-games-list')

    renderRelatedObjects(object.worked_on, 'games', relatedGamesList)
}

function renderItemDetails(object, categoryList) {
    searchResultDescription.textContent = object.description || '[No description available]'

    /* Creates, then fills, a block for each related game/dungeon/character for this specific object */
    appendRelatedObjectBlock(categoryList)
    /* Define each DOM variable created in the above function for immediete use */
    let relatedGamesList = document.getElementById('related-games-list')

    renderRelatedObjects(object.games, 'games', relatedGamesList)
}

/* Single function to render ALL related objects (Games, dungeons, characters) for an object that has one */
async function renderRelatedObjects(objectLinks, objectCategory, objectListElement) {
    for (let objectLink of objectLinks) {
        let objectData = await getObjectByLink(objectLink)
        appendObjectToList(objectData, objectCategory, objectListElement)
    }
}

/* Creates a base container for a list of related objects, with HTML IDs attached, so it can be filled out properly */
function renderRelatedObjectBase(category) {

    let relatedBase = `
            <h2>Appears in the following ${category}</h2>
            <ul class="results-list" id="related-${category}-list">
            </ul>
        `

        return relatedBase
}

/* Creates, then fills, a block for each related game/dungeon/character for this specific object */
function appendRelatedObjectBlock(categoryList) {
    for (let category of categoryList) {
        let relatedObjectsBlock = document.createElement('article')
        let relatedObjectsText = renderRelatedObjectBase(category)
        loadRelatedObjectBlock(relatedObjectsBlock, category, relatedObjectsText)
        relatedObjectsContainer.appendChild(relatedObjectsBlock)
    }
}

/* Loads the related object block with the related category and text */
function loadRelatedObjectBlock(relatedObjectBlock, relatedCategory, relatedObjectText) {
        relatedObjectBlock.classList.add('results-container')
        relatedObjectBlock.setAttribute('id', `related-${relatedCategory}`)
        relatedObjectBlock.innerHTML = relatedObjectText
}

