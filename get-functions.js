/* Grabs, like, 50 objects */
async function getSomeObjects(category, resultsTitle) {
    console.log(`Fetching SOME objects for category: ${category}`)

    resultsTitle.innerHTML = `<strong>Loading...</strong>`

    let response = await axios.get(`https://zelda.fanapis.com/api/${category}?limit=100`)

    console.log(`Obtained ${response.data.count} objects for category: ${category}`)
    resultsTitle.innerHTML = `Results`
    return response.data.data
}

/* Grabs a bunch of objects, but not everything */
/* Long ass load time */
async function getAllObjects(category, resultsTitle) {
    console.log(`Fetching all objects for category: ${category}`)


    let limit = 10 
    // There's an issue with the API that does not allow me to use large numbers to push larger arrays.
    // A limit of 1 gets the MOST objects, but has a LONG ASS load time.
    // Diminishing returns with larger limits

    // Initiate data pull
    resultsTitle.innerHTML = `<strong>Loading...</strong>`
    let pageCount = 1
    let allObjects = []
    let response = await axios.get(`https://zelda.fanapis.com/api/${category}?limit=${limit}&page=${pageCount}`)
    
    // Collects objects and pushes them into the allObjects array.
    while (response.data.count > 0) {

        // console.log(`Obtained page #${pageCount} with ${response.data.count} object(s).`)

        // Captures current page of objects
        let currentPageOfData = response.data.data


        // Adds it to full list 
        /* Keeping loop here just incase I find out how to obtain FULL ARRAYS instead of an array with 1-3 measly objects */
        for (let newObject of currentPageOfData) {
            if (allObjects.includes(newObject)) {
                console.log(`${newObject.name} already exists in the list, skipping.`)
            } else {
                // console.log(`Adding ${newObject.name} to the list.`)
                allObjects.push(newObject) /* Adds to list */
            }
        }
        // allObjects = [...allObjects, ...currentPageOfData] /* Adds to list */
        pageCount += 1 /* Moves onto next page, unless none exist */
        response = await axios.get(`https://zelda.fanapis.com/api/${category}?limit=${limit}&page=${pageCount}`)
    }

    console.log(`Total objects fetched: ${allObjects.length}`)
    resultsTitle.innerHTML = `Results`
    
    // Returns the full array of data
    return allObjects
}

// Collects an object using it's ID
async function getObjectByID(category, ID) {
    let response = await axios.get(`https://zelda.fanapis.com/api/${category}/${ID}`)
    return response.data.data
}

// Collects an object using its name
// Will only return result(s) if user input is in TITLE CASE, as API is case sensitive.
// Snatched some code from Stack Overflow to fix, see bottom of file
// Test bugs with: https://zelda.fanapis.com/api/characters?name=Ganon
// Test bugs with: https://zelda.fanapis.com/api/characters?name=Toon Zelda
async function getObjectByName(category, nameSearch) {
    let name = nameSearch.trim() /* DO NOT convert to Lowercase. API is case sensitive */
    name = toTitleCase(name) /* Converts to Title Case */
    console.log(`Searching for object by name: ${name}`)

    let response = await axios.get(`https://zelda.fanapis.com/api/${category}?name=${name}`)

    let link = `https://zelda.fanapis.com/api/${category}?name=${name}`
    console.log(`API link used: ${link}`)
    console.log(response.data.data)
    return response.data.data
}

// Collects an object using a specific API link, not sure how to implement.
async function getObjectByLink(link) {
    let response = await axios.get(`${link}`)
    return response.data.data
}

// Converts a string to Title Case
// Example: "the legend of zelda" becomes "The Legend Of Zelda"
// Here solely for getObjectByName function to work properly, as the API doesn't wanna work uniless the search input is Title Case
// Source: https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  )
}

export { getSomeObjects, getAllObjects, getObjectByID, getObjectByName, getObjectByLink }