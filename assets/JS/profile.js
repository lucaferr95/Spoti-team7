/*
// Recupero del parametro 'id' dalla URL
const URLparameters = new URLSearchParams(location.search);
const eventId = URLparameters.get("id");

const playlistApi = `https://developers.deezer.com/api/explorer?url=playlist${eventId}`;
const epiPlay = `https://developers.deezer.com/api/explorer?url=playlist/https://open.spotify.com/playlist/0TCIqS7gDraQykgm5YixHo?si=SQPnuPtISGysrB6OsfZdUQ`;

// Chiamata fetch per ottenere i dati della playlist EPI
fetch(epiPlay, {
  method: "GET",
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("la risposta non era valida");
    }
  })
  .then((data) => {
    console.log("DATI RICEVUTI DAL SERVER", data);
    displayPlaylist(data);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Funzione per visualizzare la playlist
const displayPlaylist = (data) => {
  const row = document.getElementById("displayPlaylist");
  row.innerHTML = `
    <div class="list-group">
      <a href="#" class="list-group-item d-flex align-items-center">
        <img src="${data.picture_medium}" class="playlist-img me-3" />
        <div>
          <h6 class="mb-0 text-white fs-4 mt-3">${data.title}</h6>
          <small class="text-white-50 fs-5">0 salvataggi</small>
        </div>
      </a>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <button class="btn bg-dark fs-5 text-center rounded-5 btn-outline-light btn-sm">
        Visualizza tutte le playlist
      </button>
    </div>
  `;
};
*/
