/* link API */
const albumAPI = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const artistAPI = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

/* array con 7 ID di album e ogni volta che si refresha la pagina sulla cover iniziale c'è un album diverso */
const idArrayAlbums = [
  "9410100",
  "14879699",
  "8015598",
  "6883271",
  "78630952",
  "81763",
  "300782",
]; // AC/DC, Radiohead, Evanescence, System, Iron Maiden, Linkin Park, Sigur Rós

let randomAlbumIndex = Math.floor(Math.random() * idArrayAlbums.length);
let randomAlbumSelected = idArrayAlbums[randomAlbumIndex];
console.log("Album selezionato:", randomAlbumSelected);

/* GET ALBUM function */
const getAlbum = function (id) {
  fetch(albumAPI + id)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Response not OK");
      }
    })
    .then((album) => {
      console.log("Oggetto contenente un album", album);

      /* CENTER ALBUM */
      const imgAlbum = document.getElementById("img-album");
      const albumName = document.getElementById("album-name");
      const artistAlbumName = document.getElementById("artist-album-name");
      const spanArtistName = document.getElementById("span-artist-name");
      const hrefAlbumId = document.getElementById("href-album-name");
      const hrefArtistId = document.getElementById("href-artist-name");

      imgAlbum.src = album.cover_big;
      albumName.innerText = album.title;
      artistAlbumName.innerText = album.contributors[0].name;
      spanArtistName.innerText = album.contributors[0].name;
      hrefAlbumId.href = `assets/HTML/albumpage.html?id=${album.id}`;
      hrefArtistId.href = `assets/HTML/artistpage.html?id=${album.contributors[0].id}`;

      /* FOOTER */
      const footerImg = document.getElementById("image-footer");
      const songName = document.getElementById("song-name");
      const artistName = document.getElementById("artist-name");
      const hrefAlbumIdFooter = document.getElementById(
        "href-album-name-footer"
      );
      const hrefArtistIdFooter = document.getElementById(
        "href-artist-name-footer"
      );

      footerImg.src = album.cover;
      songName.innerText = album.tracks.data[0].title;
      artistName.innerText = album.tracks.data[0].artist.name;
      hrefAlbumIdFooter.href = `assets/HTML/albumpage.html?id=${album.id}`;
      hrefArtistIdFooter.href = `assets/HTML/artistpage.html?id=${album.contributors[0].id}`;
    })
    .catch((error) => {
      console.log("Si è verificato un errore:", error);
    });
};
getAlbum(randomAlbumSelected);

/* Funzione per ottenere più album */
const getMultipleAlbums = function () {
  const apiSearch =
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=*";

  fetch(apiSearch)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Response not OK");
      }
    })
    .then((search) => {
      console.log("Oggetto contenente un array di artisti", search);

      const arrayOfDifferentArtists = [0, 15, 14, 21, 18];
      const emptyRow = document.getElementById("empty-row");

      emptyRow.innerHTML = ""; // Puliamo il contenuto prima di aggiungere nuovi elementi

      arrayOfDifferentArtists.forEach((artist) => {
        emptyRow.innerHTML += `
            <div class="col-12 col-md-5 col-lg-2 bg-dark bg-gradient rounded">
                <img src="${search.data[artist].album.cover_big}" class="img-fluid rounded mt-2" />
                <p><small><a href="assets/HTML/albumpage.html?id=${search.data[artist].album.id}" class="text-white text-decoration-none">${search.data[artist].album.title}</a></small></p>
                <p class="text-white-50">
                  <small><a href="assets/HTML/artistpage.html?id=${search.data[artist].artist.id}" class="text-white-50 text-decoration-none">${search.data[artist].artist.name}</a></small>
                </p>
            </div>
          `;
      });
    })
    .catch((error) => {
      console.log("Si è verificato un errore:", error);
    });
};

getMultipleAlbums();
