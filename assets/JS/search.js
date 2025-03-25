const searchAPI = "https://striveschool-api.herokuapp.com/api/deezer/search?q="

document.getElementById("searchButton").addEventListener("click", function () {
  let query = document.getElementById("searchInput").value.trim()

  if (!query) {
    alert("Inserisci un nome di artista o album!")
    return
  }

  // Encode per gestire gli spazi e caratteri speciali
  query = encodeURIComponent(query)

  document.getElementById(
    "results"
  ).innerHTML = `<div class="spinner-border text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`

  // Eseguiamo la ricerca
  fetch(searchAPI + query)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella ricerca")
      }
      return response.json()
    })
    .then((data) => {
      document.getElementById("results").innerHTML = "" // Pulisce i risultati

      if (data && data.data.length > 0) {
        displayResults(data.data)
      } else {
        document.getElementById("results").innerHTML =
          "<p>Nessun risultato trovato.</p>"
      }
    })
    .catch((error) => {
      console.error("Errore nella ricerca:", error)
      document.getElementById("results").innerHTML =
        "<p>Errore nella ricerca.</p>"
    })
})

// Funzione per mostrare i risultati
function displayResults(results) {
  const resultsDiv = document.getElementById("results")

  results.forEach((item) => {
    const div = document.createElement("div")
    div.classList.add("result-item")

    const img = document.createElement("img")
    img.src = item.album.cover_medium || "placeholder.jpg"

    const name = document.createElement("h3")
    name.textContent = `Titolo: ${item.title} - Artista: ${item.artist.name}`

    div.appendChild(img)
    div.appendChild(name)
    resultsDiv.appendChild(div)
  })
}
