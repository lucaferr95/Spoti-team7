// FOOTER //

/* link API */
const albumAPI = "https://striveschool-api.herokuapp.com/api/deezer/album/"
const artistAPI = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

document.addEventListener("DOMContentLoaded", function () {
  const albumAPI = "https://striveschool-api.herokuapp.com/api/deezer/album/"

  // Array di ID di album
  const idArrayAlbums = [
    "9410100",
    "14879699",
    "8015598",
    "6883271",
    "75621062",
  ]

  // Seleziona un album casuale
  const randomAlbumId =
    idArrayAlbums[Math.floor(Math.random() * idArrayAlbums.length)]

  // Fetch per ottenere i dati dell'album casuale
  fetch(albumAPI + randomAlbumId)
    .then((response) => {
      if (!response.ok) throw new Error("Errore nella richiesta API")
      return response.json()
    })
    .then((album) => {
      console.log("Album selezionato:", album)

      // Controllo che ci siano tracce disponibili
      if (album.tracks && album.tracks.data.length > 0) {
        document.getElementById("image-footer").src = album.cover_big
        document.getElementById("song-name").innerText =
          album.tracks.data[0].title
        document.getElementById("artist-name").innerText =
          album.tracks.data[0].artist.name
      } else {
        console.warn("Nessuna traccia disponibile per questo album.")
      }
    })
    .catch((error) => console.error("Errore nella fetch:", error))
})

// FINE FOOTER //
