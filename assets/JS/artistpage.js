const UrlParams = new URLSearchParams(window.location.search);
const artistId = UrlParams.get('id');
const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`;

// Funzione per formattare la durata in minuti:secondi
function formatDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Funzione per determinare se il colore è chiaro o scuro
function isDarkColor(r, g, b) {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
}

// Funzione per cambiare colore del testo in base allo sfondo
function adjustTextColor(imageUrl) {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = imageUrl;

  img.onload = function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const pixelData = ctx.getImageData(0, 0, 1, 1).data;
    const [r, g, b] = pixelData;
    const textColor = isDarkColor(r, g, b) ? 'white' : 'black';

    document.getElementById('artist-name').style.color = textColor;
    document.getElementById('artist-name2').style.color = textColor;
    document.getElementById('artist-fans').style.color = textColor;
    document.getElementById('verified-artist').style.color = textColor;
  };
}

fetch(apiUrl)
  .then((response) => response.json())
  .then((artist) => {
    document.getElementById('artist-name').innerText = artist.name;
    document.getElementById('artist-name1').innerText = artist.name;
    document.getElementById('artist-name2').innerText = artist.name;
    document.getElementById(
      'artist-background'
    ).style.backgroundImage = `url(${artist.picture_big})`;
    document.getElementById(
      'artist-fans'
    ).innerText = `${artist.nb_fan} ascoltatori mensili`;

    adjustTextColor(artist.picture_big);
    return fetch(artist.tracklist);
  })
  .then((response) => response.json())
  .then((data) => {
    const trackDiv = document.getElementById('trackDiv');
    const showMoreBtn = document.getElementById('showMoreBtn');
    let showAll = false;
    let tracks = data.data;

    function renderTracks() {
      trackDiv.innerHTML = '';
      let visibleTracks = showAll ? tracks : tracks.slice(0, 10);
      visibleTracks.forEach((track, index) => {
        function truncateText(text, maxLength) {
          return text.length > maxLength
            ? text.substring(0, maxLength) + '...'
            : text;
        }

        trackDiv.innerHTML += `
          <div class="row py-2 bg-black">
              <div class="row small">
                  <div class="col-9">
                      <span>${index + 1}</span>
                      <img src="${
                        track.album.cover
                      }" alt="" width="38" class="ps-1" />
                      <span class="flex-grow-1 ellipsis small">${truncateText(
                        track.title,
                        20
                      )}</span>
                      <button class="btn btn-sm play-btn"
                          data-preview="${track.preview}"
                          data-cover="${track.album.cover}"
                          data-title="${track.title}"
                          data-artist="${track.artist.name}"
                          data-duration="${track.duration}"
                          onclick="togglePlay(this)">
                          <i  class="fas fa-play-circle fa-lg "></i> 
                      </button>
                  </div>
                  <div class="col-2 small pt-1 pe-0 text-end">
                      ${formatDuration(track.duration)}
                  </div>
              </div>
          </div>`;
      });

      showMoreBtn.innerText = showAll ? 'Mostra meno' : 'Visualizza altro';
    }

    showMoreBtn.addEventListener('click', () => {
      showAll = !showAll;
      renderTracks();
    });

    renderTracks();
  })
  .catch((err) => console.error('Ops! Qualcosa è andato storto!', err));

let currentPlaying = null;
let audioPlayer = document.getElementById('audioPlayer');
let progressBar = document.getElementById('progress-bar');
let currentTimeDisplay = document.getElementById('current-time');
let totalTimeDisplay = document.getElementById('total-time');

function togglePlay(button) {
  let previewUrl = button.getAttribute('data-preview');
  let cover = button.getAttribute('data-cover');
  let title = button.getAttribute('data-title');
  let artist = button.getAttribute('data-artist');
  let duration = button.getAttribute('data-duration');

  if (!previewUrl) {
    console.error('Nessun URL di anteprima disponibile!');
    return;
  }

  if (audioPlayer.src !== previewUrl) {
    audioPlayer.src = previewUrl;
    audioPlayer.play();
    updateButton(button, true);
    updateFooter(cover, title, artist, duration);
  } else if (audioPlayer.paused) {
    audioPlayer.play();
    updateButton(button, true);
  } else {
    audioPlayer.pause();
    updateButton(button, false);
  }

  if (currentPlaying && currentPlaying !== button) {
    updateButton(currentPlaying, false);
  }

  currentPlaying = button;
}

function updateButton(button, isPlaying) {
  let icon = button.querySelector('i');
  icon.classList.toggle('fa-play-circle', !isPlaying);
  icon.classList.toggle('fa-pause-circle', isPlaying);
}

function updateFooter(cover, title, artist, duration) {
  document.getElementById('footer-track-img').src = cover;
  document.getElementById('footer-track-name').innerText = title;
  document.getElementById('footer-artist-name').innerText = artist;
  totalTimeDisplay.innerText = formatDuration(duration);
  progressBar.style.width = '0%';
}

audioPlayer.addEventListener('timeupdate', function () {
  if (audioPlayer.duration) {
    let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeDisplay.innerText = formatDuration(
      Math.floor(audioPlayer.currentTime)
    );
  }
});

progressBar.addEventListener('input', function () {
  let seekTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
});

function seekTrack(event) {
  let progressContainer = event.currentTarget;
  let clickX = event.offsetX;
  let totalWidth = progressContainer.offsetWidth;
  let seekTime = (clickX / totalWidth) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
}

// Volume Control

let volumeControl = document.getElementById('volume-control');
audioPlayer.volume = 0.5; // Imposta il volume al 50% all'avvio
volumeControl.value = 50; // Imposta il valore della barra del volume a 50%
volumeControl.addEventListener('input', function () {
  audioPlayer.volume = this.value / 100;
});
