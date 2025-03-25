// Recupero del parametro 'id' dalla URL
const URLparameters = new URLSearchParams(location.search);
const eventId = URLparameters.get("id");

const albumURL = `https://striveschool-api.herokuapp.com/api/deezer/album/${eventId}`;
const gioventuBruciata = `https://striveschool-api.herokuapp.com/api/deezer/album/87722792`;

// Chiamata fetch per ottenere i dati dell'album di Mahmood
fetch(gioventuBruciata, {
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
    displayAlbum(data);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Funzione per visualizzare l'album e le tracce
const displayAlbum = (data) => {
  const row = document.getElementById("displayAlbum");
  row.innerHTML = `
   <div class="pb-3 bg-primary bg-gradient">
  <div class="row align-items-center">
    <!-- Colonna sinistra con l'immagine dell'album -->
    <div class="col-md-4">
      <img src="${data.cover_medium}" class="album-cover img-fluid py-2" alt="${
    data.title
  }">
    </div>

    <!-- Colonna destra con il titolo animato -->
    <div class="col-md-8 d-flex flex-column">
      <div class="album-title-container">
        <h2 class="text-white display-4 album-font album-title">${
          data.title
        }</h2>
      </div>
      <h5 class="text-white fs-5 text-start">${data.artist.name}</h5>
      <h5 class="text-white fs-5 text-start">${data.release_date}</h5>
    </div>
  </div>
</div>



    <div class="mt-4">
      <ul class="list-group">
        ${data.tracks.data
          .map(
            (track, index) => `
              <li class="list-group-item w-100 text-white d-flex justify-content-between align-items-center "
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
