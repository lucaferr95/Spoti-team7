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

const displayAlbum = (data) => {
  const row = document.getElementById("displayAlbum");
  row.innerHTML = `
      <div class="album-header d-flex align-items-center p-4">
          <img src="${data.cover_big}" class="album-cover me-3" alt="${
    data.title
  }">
          <div>
              <h2>${data.title}</h2>
              <ul class="list-group">
                  ${data.tracks.data
                    .map(
                      (track, index) => `
                      <li class="list-group-item w-100 text-white d-flex justify-content-between align-items-center"
                          style="background-color: #21160F; border: none;">
                          <span>${index + 1}. ${track.title}</span>
                          <span>${Math.floor(track.duration / 60)}:${(
                        track.duration % 60
                      )
                        .toString()
                        .padStart(2, "0")}</span>
                      </li>
                  `
                    )
                    .join("")}
              </ul>
          </div>
      </div>
    `;
};

displayAlbum();
