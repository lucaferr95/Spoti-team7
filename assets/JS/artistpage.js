const UrlParams = new URLSearchParams(window.location.search); // Recupero i parametri della query dall'URL
const artistId = UrlParams.get('id'); // Dall'oggetto prendo il valore dell'id dell'artista
const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`; // Costruisco l'URL dell'API

fetch(apiUrl) // Cerco di ottenere i dati dell'artista
  .then((response) => response.json()) // Converto la risposta in un oggetto JavaScript
  .then((artist) => {
    // Inserisco i dati dell'artista
    document.getElementById('artist-name').innerText = artist.name;
    document.getElementById('artist-picture').src = artist.picture_big;
    document.getElementById(
      'artist-fans'
    ).innerText = `${artist.nb_fan} ascoltatori mensili`;

    // Richiamo della tracklist
    return fetch(artist.tracklist);
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const trackListContainer = document.getElementById('track-list');
    trackListContainer.innerHTML = '';

    data.data.forEach((track) => {
      //per ogni traccia creo un div chiamato track.
      const trackElement = document.createElement('div');
      trackElement.classList.add('track');
      //prendo il nome della traccia e aggiungo un bottone che se cliccato
      //chiama la funzione playTrack per riprodurre la canzone
      trackElement.innerHTML = `
<p>${track.title}</p>
<button onclick="playTrack('${track.preview}', '${track.title}', '${track.artist.name}')">▶</button>
      `;

      trackListContainer.appendChild(trackElement);
    });
  })
  .catch((err) => console.error('Ops! qualcosa è andato storto!', err));
// Funzione per avviare la riproduzione del brano
//Cambia l'audio con l'URL della traccia (prevuewURL)
//Aggiorna il titolo e il nome dell'artista
//avvia la riproduzione con .play()
function playTrack(previewUrl, title, artist) {
  const player = document.getElementById('audio-player');
  const trackTitle = document.getElementById('track-title');
  const trackArtist = document.getElementById('track-artist');

  player.src = previewUrl;
  trackTitle.innerText = title;
  trackArtist.innerText = artist;
  player.play();
}
