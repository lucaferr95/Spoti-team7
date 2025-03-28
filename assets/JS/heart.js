document.addEventListener('DOMContentLoaded', function () {
  const heartIcons = document.querySelectorAll('.far.fa-heart'); // Seleziona tutti i cuori

  heartIcons.forEach((heart) => {
    heart.addEventListener('click', function (event) {
      event.preventDefault(); // Evita comportamenti indesiderati
      window.getSelection().removeAllRanges(); // Rimuove la selezione del testo, se presente
      this.classList.toggle('fas'); // Cambia icona in cuore pieno
      this.classList.toggle('far'); // Rimuove il contorno
      this.classList.toggle('green-heart'); // Cambia colore
    });
  });
});
