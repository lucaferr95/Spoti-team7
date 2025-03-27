const searchAPI = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
let allResults = []
let showingAll = false

// Recupera eventuali risultati salvati nel LocalStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedResults = localStorage.getItem("searchResults")
  if (savedResults) {
    allResults = JSON.parse(savedResults)
    displayResults()
    document.getElementById("show-more").style.display =
      allResults.length > 6 ? "block" : "none"
  }
})

document.getElementById("searchButton").addEventListener("click", function () {
  let query = document.getElementById("searchInput").value.trim()

  if (!query) {
    alert("Inserisci un nome di artista o album!")
    return
  }

  query = encodeURIComponent(query)

  document.getElementById("results").innerHTML = `
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`

  fetch(searchAPI + query)
    .then((response) => {
      if (!response.ok) throw new Error("Errore nella ricerca")
      return response.json()
    })
    .then((data) => {
      if (data && data.data.length > 0) {
        allResults = data.data
        localStorage.setItem("searchResults", JSON.stringify(allResults)) // Salva nel LocalStorage
        showingAll = false
        displayResults()
        document.getElementById("show-more").style.display = "block"
      } else {
        document.getElementById("results").innerHTML =
          "<p class='text-center text-danger'>Nessun risultato trovato.</p>"
        document.getElementById("show-more").style.display = "none"
      }
    })
    .catch((error) => {
      console.error("Errore nella ricerca:", error)
      document.getElementById("results").innerHTML =
        "<p class='text-center text-danger'>Errore nella ricerca.</p>"
      document.getElementById("show-more").style.display = "none"
    })
})

// Funzione per mostrare i risultati
function displayResults() {
  const resultsDiv = document.getElementById("results")
  resultsDiv.innerHTML = ""

  const resultsToShow = showingAll ? allResults : allResults.slice(0, 6)

  resultsToShow.forEach((item) => {
    resultsDiv.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 pt-4 justify-content-center d-flex align-items-stretch">
        <div class="card mb-3 d-flex flex-column w-100">
          <img src="${item.album.cover_medium}" class="card-img-top track-image" alt="img di ${item.album.title}">
          <div class="card-body bg-success bg-opacity-75 bg-gradient text-white d-flex flex-column">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text flex-grow-1 small">Artista: ${item.artist.name}</p>
            <a href="albumpage.html?id=${item.album.id}" class="btn btn-sm btn-dark">Ascolta l'album</a>
            <a href="artistpage.html?id=${item.artist.id}" class="btn btn-sm btn-success mt-3">Ascolta l'artista</a>
          </div>
        </div>
      </div>
    `
  })

  document.getElementById("show-more").innerHTML = `
    <p class="text-white-50 small fw-bold">
      <small>${showingAll ? "MOSTRA MENO" : "VISUALIZZA TUTTO"}</small>
    </p>
    `
}

// Pulsante "Mostra di più / Mostra meno"
document.getElementById("show-more").addEventListener("click", function () {
  showingAll = !showingAll
  displayResults()
})

// Pulsante per resettare la ricerca
document.getElementById("resetButton").addEventListener("click", function () {
  localStorage.removeItem("searchResults")
  allResults = []
  document.getElementById("results").innerHTML =
    "<h3 class='text-center text-success fs-5'>Ricerca resettata. Fai una nuova ricerca</h3>"
  document.getElementById("show-more").style.display = "none"
})
