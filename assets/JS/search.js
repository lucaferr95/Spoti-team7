const albumAPI = "https://striveschool-api.herokuapp.com/api/deezer/album/"
const artistAPI = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

document.getElementById("searchButton").addEventListener("click", function () {
  const query = document.getElementById("searchInput").value.trim()

  if (!query) {
    alert("Inserisci un nome di artista o album!")
    return
  }

  document.getElementById("results").innerHTML = "<p>Caricamento...</p>"

  // Proviamo a cercare un artista
  fetch(artistAPI + query)
    .then((response) => {
      if (!response.ok) throw new Error("Artista non trovato")
      return response.json()
    })
    .then((data) => {
      displayResults([data], "Artista")
    })
    .catch(() => {
      // Se l'artista non esiste, proviamo con l'album
      fetch(albumAPI + query)
        .then((response) => {
          if (!response.ok) throw new Error("Album non trovato")
          return response.json()
        })
        .then((data) => {
          displayResults([data], "Album")
        })
        .catch(() => {
          document.getElementById("results").innerHTML =
            "<p>Nessun risultato trovato.</p>"
        })
    })
})

// Funzione per mostrare i risultati
function displayResults(results, tipo) {
  const resultsDiv = document.getElementById("results")
  resultsDiv.innerHTML = ""

  results.forEach(function (item) {
    const div = document.createElement("div")
    div.classList.add("result-item")

    const img = document.createElement("img")
    img.src = item.picture_medium || item.cover_medium || "placeholder.jpg"

    const name = document.createElement("h3")
    name.textContent = tipo + ": " + (item.name || item.title)

    div.appendChild(img)
    div.appendChild(name)
    resultsDiv.appendChild(div)
  })
}
