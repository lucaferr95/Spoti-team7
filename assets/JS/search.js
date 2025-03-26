const searchAPI = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
let allResults = [] // Memorizza tutti i risultati trovati
let showingAll = false // Stato per mostrare più o meno risultati

document.getElementById("searchButton").addEventListener("click", function () {
  let query = document.getElementById("searchInput").value.trim()

  if (!query) {
    alert("Inserisci un nome di artista o album!")
    return
  }

  query = encodeURIComponent(query)

  document.getElementById(
    "results"
  ).innerHTML = `<div class="d-flex justify-content-center">
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
        allResults = data.data // Salviamo tutti i risultati
        showingAll = false // Reset stato
        displayResults() // Mostra i primi risultati
        document.getElementById("show-more").style.display = "block" // Mostra il pulsante
      } else {
        document.getElementById("results").innerHTML =
          "<p class='text-center text-danger'>Nessun risultato trovato.</p>"
        document.getElementById("show-more").style.display = "none" // Nasconde il pulsante se non ci sono risultati
      }
    })
    .catch((error) => {
      console.error("Errore nella ricerca:", error)
      document.getElementById("results").innerHTML =
        "<p class='text-center text-danger'>Errore nella ricerca.</p>"
      document.getElementById("show-more").style.display = "none" // Nasconde il pulsante in caso di errore
    })
})

const albumAPI = "https://striveschool-api.herokuapp.com/api/deezer/album/"
const artistAPI = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

function displayResults() {
  const resultsDiv = document.getElementById("results")
  resultsDiv.innerHTML = ""

  // Determiniamo quanti elementi mostrare
  const resultsToShow = showingAll ? allResults : allResults.slice(0, 6)

  resultsToShow.forEach((item) => {
    resultsDiv.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 pt-4 justify-content-center d-flex align-items-stretch">
                <div class="card mb-3 d-flex flex-column w-100">
                    <a href="albumpage.html?id=${item.album.id}">
                        <img src="${item.album.cover_medium}" class="card-img-top" alt="img di ${item.album.title}">
                    </a>
                    <div class="card-body bg-success bg-opacity-75 bg-gradient text-white d-flex flex-column">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text flex-grow-1 small">
                            <a class="text-white text-decoration-none" href="artistpage.html?id=${item.artist.id}">Artista: ${item.artist.name}</a>
                        </p>
                        <a href="" target="_blank" class="btn btn-sm btn-dark">Ascolta ora</a>
                    </div>
                </div>
            </div>
        `
  })

  // Modifica il testo del pulsante in base allo stato
  document.getElementById("show-more").innerHTML = `
    <p class="text-white-50 small fw-bold">
      <small>${showingAll ? "MOSTRA MENO" : "VISUALIZZA TUTTO"}</small>
    </p>`
}

// Event listener per il pulsante "VISUALIZZA TUTTO / MOSTRA MENO"
document.getElementById("show-more").addEventListener("click", function () {
  showingAll = !showingAll // Invertiamo lo stato
  displayResults() // Ricarichiamo i risultati
})
