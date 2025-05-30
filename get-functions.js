/* Grabs, like, 50 items */
async function getSomeItems(category, resultsTitle) {
    console.log(`Fetching SOME items for category: ${category}`)
    resultsTitle.innerHTML = `<strong>Loading...</strong>`
    let response = await axios.get(`https://zelda.fanapis.com/api/${category}?limit=100`)
    console.log(`Obtained ${response.data.count} items for category: ${category}`)
    resultsTitle.innerHTML = `Results for <strong>${category}</strong> (${response.data.data.length} items)`
    return response.data.data
}

/* Grabs a bunch of items, but not everything */
/* Long ass load time */
async function getAllItems(category, resultsTitle) {
    console.log(`Fetching all items for category: ${category}`)

    let limit = 5 /* Doesn't let me put big numbers for some reason */
    // There's an issue with the API that does not allow me to use proper big numbers to push larger arrays.
    // A limit of 1 gets the MOST items, but still doesn't get everything. LONG ASS load time as well.
    // Diminishing returns with larger limits

    resultsTitle.innerHTML = `<strong>Loading...</strong>`
    let pageCount = 1
    let allItems = []
    let response = await axios.get(`https://zelda.fanapis.com/api/${category}?limit=${limit}&page=${pageCount}`)
    
    while (response.data.count > 0) {

        // console.log(`Obtained page #${pageCount} with ${response.data.count} item(s).`)

        // Captures current page of items
        let currentPageOfData = response.data.data


        // Adds it to full list 
        /* Keeping loop here just incase I find out how to obtain FULL ARRAYS instead of an array with 1-3 measly items */
        for (let newItem of currentPageOfData) {
            if (allItems.includes(newItem)) {
                console.log(`${newItem.name} already exists in the list, skipping.`)
            } else {
                // console.log(`Adding ${newItem.name} to the list.`)
                allItems.push(newItem) /* Adds to list */
            }
        }
        // allItems = [...allItems, ...currentPageOfData] /* Adds to list */
        pageCount += 1 /* Moves onto next page, unless none exist */
        response = await axios.get(`https://zelda.fanapis.com/api/${category}?limit=${limit}&page=${pageCount}`)
    }
    console.log(`Total items fetched: ${allItems.length}`)
    resultsTitle.innerHTML = `Results for <strong>${category}</strong> (${allItems.length} items)`
    return allItems
}

async function getItemByID(category, ID) {
    let response = await axios.get(`https://zelda.fanapis.com/api/${category}/${ID}`)
    return response.data.data
}

async function getItemByName(category, nameSearch) {
    let name = nameSearch.toLowerCase().trim()
    let response = await axios.get(`https://zelda.fanapis.com/api/${category}?name=${name}`)
    return response.data.data
}

export { getSomeItems, getAllItems, getItemByID, getItemByName }