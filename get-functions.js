/* Grabs, like, 50 objects */
async function getSomeObjects(category, resultsTitle) {
    console.log(`Fetching SOME objects for category: ${category}`)

    resultsTitle.innerHTML = `<strong>Loading...</strong>`

    let response = await axios.get(`https://zelda.fanapis.com/api/${category}?limit=100`)

    console.log(`Obtained ${response.data.count} objects for category: ${category}`)
    resultsTitle.innerHTML = `Results for <strong>${category}</strong> (${response.data.data.length} objects)`
    return response.data.data
}

/* Grabs a bunch of objects, but not everything */
/* Long ass load time */
async function getAllObjects(category, resultsTitle) {
    console.log(`Fetching all objects for category: ${category}`)


    let limit = 10 /* Doesn't let me put big numbers for some reason */
    // There's an issue with the API that does not allow me to use proper big numbers to push larger arrays.
    // A limit of 1 gets the MOST objects, but still doesn't get everything. LONG ASS load time as well.
    // Diminishing returns with larger limits

    resultsTitle.innerHTML = `<strong>Loading...</strong>`
    let pageCount = 1
    let allObjects = []
    let response = await axios.get(`https://zelda.fanapis.com/api/${category}?limit=${limit}&page=${pageCount}`)
    
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
    resultsTitle.innerHTML = `Results for <strong>${category}</strong> (${allObjects.length} objects)`
    
    return allObjects
}

async function getObjectByID(category, ID) {
    let response = await axios.get(`https://zelda.fanapis.com/api/${category}/${ID}`)
    return response.data.data
}

async function getObjectByName(category, nameSearch) {
    let name = nameSearch.toLowerCase().trim()
    let response = await axios.get(`https://zelda.fanapis.com/api/${category}?name=${name}`)
    return response.data.data
}

async function getObjectByLink(link) {
    let response = await axios.get(`${link}`)
    return response.data.data
}

export { getSomeObjects, getAllObjects, getObjectByID, getObjectByName, getObjectByLink }