// Your Code Here!

// Part 1: Combine 2 Data Sets into 1 Data Set, using "title" property
const combinedDataSet = movieDetails.map(details => {
    const sameMovie = movies.find(movie => movie.title === details.title)
    return { ...structuredClone(details), ...structuredClone(sameMovie) }
}
)

// Part 2: Render the movies onto the page
const movieBox = document.createElement("div")
movieBox.setAttribute("class", "movie-box")
document.body.append(movieBox)

function renderSelectedMovie(array) {
    for (let index = 0; index < array.length; index += 4) {
        const currentMovie = document.createElement("div")
        currentMovie.setAttribute("class", "movie-card")
        currentMovie.innerHTML =
            `
        <img src = '${array[index].imageUrl}' class = 'movie-card-image'>
        <h2>${array[index].title}</h2>
        <h3>${array[index].cast}</h3>
        <h3>${array[index].year}</h3>
        `
        movieBox.append(currentMovie)
    }
}
renderSelectedMovie(combinedDataSet)

// Part 3: Searching through movies by title and/or actor/actress
function searchFunction(array, searchTerm) {
    for (let index = 0; index < array.length; index += 1) {
        let query = array[index]
        if (query.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true
        }
    }
    return false
}

function submitSearch(event) {
    event.preventDefault()
    movieBox.innerHTML = ""
    const movieSearchInput = document.querySelector(".search-movie")
    const actorSearchInput = document.querySelector(".search-actor")

    let searchTitle = movieSearchInput.value
    let searchActor = actorSearchInput.value

    const searchArray = combinedDataSet.filter(movie => movie.title.toLowerCase().includes(searchTitle.toLowerCase()))
        .filter(movie => (searchFunction(movie.cast, searchActor)))

    renderSelectedMovie(searchArray)
}

const searchButton = document.querySelector(".search-form")
searchButton.addEventListener("submit", submitSearch)

console.log("Movies:", movies);
console.log("MovieDetails:", movieDetails);