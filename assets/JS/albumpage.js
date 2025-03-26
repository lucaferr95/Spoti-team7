// Recupero del parametro 'id' dalla URL
const URLparameters = new URLSearchParams(location.search);
const eventId = URLparameters.get("id");

if (eventId) {
  const albumURL = `https://striveschool-api.herokuapp.com/api/deezer/album/${eventId}`;

  // Chiamata fetch per ottenere i dati dell'album
  fetch(albumURL, { method: "GET" })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("La risposta non era valida");
      }
    })
    .then((data) => {
      console.log("DATI RICEVUTI DAL SERVER", data);
      displayAlbum(data);
    })
    .catch((error) => {
      console.log("Errore:", error);
    });
}

// Funzione per visualizzare l'album e le tracce
const displayAlbum = (data) => {
  const row = document.getElementById("displayAlbum");
  row.innerHTML = `
    <div class="pb-3 bg-primary bg-gradient">
      <div class="row align-items-center">
        <div class="row m-1 justify-content-between">
          <div class="col-6 ps-0 fs-3 text-start ps-4">
            <i class="fas fa-chevron-circle-left text-black"></i>
            <i class="fas fa-chevron-circle-right text-black"></i>
          </div>
          <div class="col-6 text-end">
            <div class="dropdown">
              <button class="btn btn-sm bg-black text-white dropdown-toggle rounded-pill"
                      type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img width="20" src="IMG_20241012_115436_809.jpg"
                     class="rounded-circle me-1" />
                Signor Leo...
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Cambia account</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <img src="${
            data.cover_medium
          }" class="album-cover img-fluid py-5 ps-3" alt="${data.title}">
        </div>
        <div class="col-md-8 d-flex flex-column">
          <h3 class="text-center text-black text-gradient fs-2"> NOW PLAYING </h3>
          <div class="album-title-container">
            <h2 class="text-decoration-underline text-opacity-75 display-4 album-font album-title">${
              data.title
            }</h2>
          </div>
          <h5 class="text-white fs-5 text-start text-white-50">${
            data.artist.name
          }</h5>
          <h5 class="text-white fs-5 text-start text-white-50">${
            data.release_date
          }</h5>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <ul class="list-group">
        ${data.tracks.data
          .map(
            (track, index) => `
              <li class="list-group-item w-100 text-white d-flex justify-content-between align-items-center"
                  style="background-color: #21160F; border: none;">
                <span>${index + 1}. ${track.title}</span>
                <span>${Math.floor(track.duration / 60)}:${(track.duration % 60)
              .toString()
              .padStart(2, "0")}</span>
              </li>
            `
          )
          .join("")}
      </ul>
    </div>
  `;
};
