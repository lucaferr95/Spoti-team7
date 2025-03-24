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

        const emptyRow = document.getElementById('empty-row')

        //crea card per l'album nel main
        emptyRow.innerHTML = `
            <div class="card mb-3 rounded-0 bg-black text-white">
              <div class="row g-0">
                <div class="col-md-4 p-3">
                  <img src=${album.cover_big} class="img-fluid" alt="album cover">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <p>
                      <small>ALBUM</small>
                    </p>
                    <h1 class="card-title">${album.title}</h1>
                    <p class="card-text">${album.contributors[0].name}</p>
                     <div class="buttons">
                       <button class="btn btn-primary rounded-pill bg-success text-black border-0 me-2" type="submit">Play</button>
                       <button class="btn btn-primary rounded-pill bg-transparent border-white me-2" type="submit">Save</button>
                       <div class="btn-group">
                        <button class="btn btn-secondary bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="fas fa-ellipsis-h"></i>
                        </button>
                        <ul class="dropdown-menu bg-black">
                          <li><a class="dropdown-item text-light" href="#">Menu item</a></li>
                          <li><a class="dropdown-item text-light" href="#">Menu item</a></li>
                          <li><a class="dropdown-item text-light" href="#">Menu item</a></li>
                        </ul>
                      </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
            `


            //crea card con song nel footer in basso a sinistra
            // sarebbe carino che pescasse una caonze a caso per album selezionato


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