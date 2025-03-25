/* link API */
const albumAPI = 'https://striveschool-api.herokuapp.com/api/deezer/album/'
const artistAPI = 'https://striveschool-api.herokuapp.com/api/deezer/artist/'


/* array con 3-4 ID di album e ogni votla che si refresha la pagina sulla cover iniziale c'è un album diverso */

const idArrayAlbums = ['9410100', '14879699', '8015598', '6883271'] // AC/DC, Radiohead, Evanescence, korn
let raondomAlbumIndex = Math.floor(Math.random() * idArrayAlbums.length)
let randomAlbumSelected = idArrayAlbums[raondomAlbumIndex]
console.log('r', randomAlbumSelected)

/* GET ALBUM function - */
const getAlbum = function (id) {
    
    fetch(albumAPI + id)
    .then((response) => {
        if(response.ok){
            return response.json()
        } else {
            throw new Error('response not ok')
        }
    })
    .then((album) => {
        /* -------------------------------------------------- */
        /* album è un oggetto */
        // dall'oggetto posso recuperare: album.title - album.cover_medium - album.tracks[] è un array contenente varie canzoni - album.contributors[0].name per avere il nome dell'artista
        
        
        //hideSpinner()   // spinner se ci interessa
        console.log('oggetto contenente un album', album)

        //const emptyRow = document.getElementById('empty-row')

        //crea card per l'album nel main
      /* CENTER */

      const imgAlbum = document.getElementById('img-album')
      const albumName = document.getElementById('album-name')
      const artistAlbumName = document.getElementById('artist-album-name')
      const spanArtistName = document.getElementById('span-artist-name')

      imgAlbum.src = album.cover_big 
      albumName.innerText = album.title 
      artistAlbumName.innerText = album.contributors[0].name
      spanArtistName.innerText = album.contributors[0].name




            /* FOOTER */
            // sarebbe carino che pescasse una caonze a caso per album selezionato, per ora ne seleziona una sola


            const footerImg = document.getElementById('image-footer')
            const songName = document.getElementById('song-name')
            const artistName = document.getElementById('artist-name')

            footerImg.src = album.cover_big  // album.tracks.data[0].md5_image non trovo l'img della canzone
            songName.innerText = album.tracks.data[0].title  
            artistName.innerText = album.tracks.data[0].artist.name  


    })
    .catch((error) => {
        //hideSpinner()
        console.log('si è verificato un errore', error)
    })
}
getAlbum(randomAlbumSelected) // apre un album a caso pescandolo dall'array

// array possibile con album e songs
const arrayAlbumsAndSong = [
    {
        'album': '9410100',
        'songs': ['92720036', '92720038', '9410100']
    }
]

//quando premi avanti e idietro nel carosello deve cambiare album di nuovo a random

// album.tracks.data[0].title ---- album.tracks.data[0].artist.name




/* <div class="row px-1 pt-3 justify-content-around g-3">
              <div class="col-12 col-md-5 col-lg-2 bg-dark bg-gradient rounded">
                <img
                  src="../imgs/main/image-17.jpg"
                  class="img-fluid rounded mt-2"
                />
                <p><small>Hot Hits Italia</small></p>
                <p class="text-white-50">
                  <small>La playlist più calda di qualcosa</small>
                </p>
              </div>
              <div class="col-12 col-md-5 col-lg-2 bg-dark bg-gradient rounded">
                <img
                  src="../imgs/main/image-17.jpg"
                  class="img-fluid rounded mt-2"
                />
                <p><small>Hot Hits Italia</small></p>
                <p class="text-white-50">
                  <small>La playlist più calda di qualcosa</small>
                </p>
              </div>
              <div class="col-12 col-md-5 col-lg-2 bg-dark bg-gradient rounded">
                <img
                  src="../imgs/main/image-17.jpg"
                  class="img-fluid rounded mt-2"
                />
                <p><small>Hot Hits Italia</small></p>
                <p class="text-white-50">
                  <small>La playlist più calda di qualcosa</small>
                </p>
              </div>
              <div class="col-12 col-md-5 col-lg-2 bg-dark bg-gradient rounded">
                <img
                  src="../imgs/main/image-17.jpg"
                  class="img-fluid rounded mt-2"
                />
                <p><small>Hot Hits Italia</small></p>
                <p class="text-white-50">
                  <small>La playlist più calda di qualcosa</small>
                </p>
              </div>
              <div class="col-12 col-md-4 col-lg-2 bg-dark bg-gradient rounded">
                <img
                  src="../imgs/main/image-17.jpg"
                  class="img-fluid rounded mt-2"
                />
                <p><small>Hot Hits Italia</small></p>
                <p class="text-white-50">
                  <small>La playlist più calda di qualcosa</small>
                </p>
              </div>
            </div> */


