const searchAPI = "https://striveschool-api.herokuapp.com/api/deezer/search?q="

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
        displayResults(data.data)
      } else {
        document.getElementById("results").innerHTML =
          "<p class='text-center text-danger'>Nessun risultato trovato.</p>"
      }
    })
    .catch((error) => {
      console.error("Errore nella ricerca:", error)
      document.getElementById("results").innerHTML =
        "<p class='text-center text-danger'>Errore nella ricerca.</p>"
    })
})

function displayResults(results) {
  const resultsDiv = document.getElementById("results")
  resultsDiv.innerHTML = ""

  results.forEach((item) => {
    resultsDiv.innerHTML += `
    
            <div class="col-12 col-md-6 col-lg-4 pt-4">
                <div class="card mb-3">
                    <img src="${item.album.cover_medium}" class="card-img-top" alt="img di ${item.album.title}">
                    <div class="card-body bg-black bg-opacity-50 bg-gradient text-white">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">Artista: ${item.artist.name}</p>
                        <button href="${item.link}" target="_blank" class="btn btn-sm btn-success">Ascolta su spotify</button>
                    </div>
                </div>
            </div>
        `
  })
}
