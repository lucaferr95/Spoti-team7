// Recupero del parametro 'id' dalla URL
const URLparameters = new URLSearchParams(location.search);
const eventId = URLparameters.get("id");

if (eventId) {
  const albumURL = `https://striveschool-api.herokuapp.com/api/deezer/album/${eventId}`;

  fetch(albumURL)
    .then((response) => {
      if (!response.ok) throw new Error("Errore nella richiesta");
      return response.json();
    })
    .then((data) => {
      console.log("DATI RICEVUTI", data);
      displayAlbum(data);
    })
    .catch((error) => console.log("Errore:", error));
}

const displayAlbum = (data) => {
  const row = document.getElementById("displayAlbum");
  row.innerHTML = `
    <div class="pb-3 bg-primary bg-opacity-50 bg-gradient">
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
                <img width="20" src="../../IMG_20241012_115436_809.jpg" 
                     class="rounded-circle me-1" />
                Signor Leo...
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="../HTML/profile.html">Cambia account</a></li>
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
          <h3 class="text-black text-gradient fs-2"> NOW PLAYING </h3>
          <div class="album-title-container">
            <h2 class="text-decoration-underline animated-text text-opacity-75 display-4  album-font album-title fs-5 text-wrap">
              ${data.title}
            </h2>
          </div>
          <a href="artistpage.html?id=${
            data.artist.id
          }" class="text-white-50 text-decoration-none">
            <h5 class="text-white fs-5 text-start text-white-50">${
              data.artist.name
            }</h5>
          </a>
          <h5 class="text-dark fs-5 text-start text-dark-50">${
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
              <li class="list-group-item w-100 text-white d-flex justify-content-between align-items-center bg-transparent border-0">
                <span>${index + 1}. ${track.title} 
                  <button class="btn btn-sm play-btn"
                          data-preview="${track.preview}"
                          data-cover="${track.album.cover}"
                          data-title="${track.title}"
                          data-artist="${track.artist.name}"
                          data-duration="${track.duration}"
                          onclick="togglePlay(this)">
                      <i class="fas fa-play-circle fa-lg"></i>  
                  </button>
                </span>
                <span>${formatTime(track.duration)}</span>
              </li>
            `
          )
          .join("")}
      </ul>
    </div>
  `;
};

let currentAudio = null;
let currentButton = null;
let progressBar = document.getElementById("progress-bar");
let currentTimeDisplay = document.getElementById("current-time");
let totalTimeDisplay = document.getElementById("total-time");

// Footer elementi
const footerTrackName = document.getElementById("footer-track-name");
const footerArtistName = document.getElementById("footer-artist-name");
const footerArtistName2 = document.getElementById("artist-name2");
const footerTrackImage = document.getElementById("footer-track-image");

const togglePlay = (button) => {
  const trackUrl = button.getAttribute("data-preview");
  const duration = parseInt(button.getAttribute("data-duration"), 10);
  const trackTitle = button.getAttribute("data-title");
  const trackArtist = button.getAttribute("data-artist");
  const trackCover = button.getAttribute("data-cover");
  const icon = button.querySelector("i");

  if (currentAudio) {
    if (currentAudio.src === trackUrl) {
      if (currentAudio.paused) {
        currentAudio.play();
        icon.classList.replace("fa-play-circle", "fa-pause-circle");
      } else {
        currentAudio.pause();
        icon.classList.replace("fa-pause-circle", "fa-play-circle");
      }
      return;
    } else {
      currentAudio.pause();
      currentButton
        .querySelector("i")
        .classList.replace("fa-pause-circle", "fa-play-circle");
    }
  }

  currentAudio = new Audio(trackUrl);
  currentAudio.play();
  icon.classList.replace("fa-play-circle", "fa-pause-circle");
  currentButton = button;

  totalTimeDisplay.textContent = formatTime(duration);

  // Aggiorna il footer con la traccia in riproduzione
  footerTrackName.textContent = trackTitle;
  footerArtistName.textContent = trackArtist;
  footerArtistName2.textContent = trackArtist;
  footerTrackImage.src = trackCover;
  footerTrackImage.onload = () => {
    footerTrackImage.style.width = "80px";
    footerTrackImage.style.height = "80px";
    footerTrackImage.style.objectFit = "cover";
  };

  footerTrackImage.src = trackCover; // Cambia l'immagine

  currentAudio.ontimeupdate = updateProgress;
  currentAudio.onended = () => {
    icon.classList.replace("fa-pause-circle", "fa-play-circle");
    progressBar.style.width = "0%";
    currentTimeDisplay.textContent = "0:00";
  };
};

const updateProgress = () => {
  if (currentAudio) {
    let progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeDisplay.textContent = formatTime(
      Math.floor(currentAudio.currentTime)
    );
  }
};

const seekTrack = (event) => {
  if (!currentAudio) return;

  const progressContainer = event.currentTarget;
  const rect = progressContainer.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const width = rect.width;
  const seekTime = (clickX / width) * currentAudio.duration;

  currentAudio.currentTime = seekTime;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const volumeControl = document.getElementById("volume-control");
volumeControl.value = 50; // Aggiorna la barra di input
if (currentAudio) {
  currentAudio.volume = 0.5; // Imposta il volume dell'audio
}

// Aggiorna il volume quando cambia l'input
volumeControl.addEventListener("input", () => {
  if (currentAudio) {
    currentAudio.volume = volumeControl.value / 100;
  }
});
