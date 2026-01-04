let shownCards = [];
let baseCards = [];

/**
 * Reinicia el arreglo con las cartas de la baraja y quita la carta actual.
 * @author Carlos Salas
 * @date 03/Ene/2026
 */
function resetCards() {
  baseCards = [];
  const button = document.getElementById("botonMostrarCarta");
  const backgroundImg = document.getElementById("contenedorcartas");
  button.removeAttribute("disabled");
  backgroundImg.style.backgroundImage = "";
  for (let i = 1; i <= 54; i++) {
    baseCards.push(i);
  }
  console.log(baseCards);
}

/**
 * Obtiene una carta aleatoria de las restantes de la baraja.
 *
 * @returns {number} Retorna Un número aleatorio entre 1 y 54 de los valores disponibles en la baraja. Y retorna un -1 si ya no hay cartas disponibles en la baraja.
 *
 * @author Carlos Salas
 * @date 03/Ene/2026
 */
function getRandomCard() {
  if (baseCards.length === 0) return -1;
  const min = 0; // 0 - 53
  const max = baseCards.length - 1;
  const pickedNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const selectedCard = baseCards[pickedNumber];
  baseCards.splice(pickedNumber, 1);
  return selectedCard;
}

/**
 * Cambia la imágen del contenedor de la carta actual.
 * La carta seleccionada se basa en las cartas faltantes por mostrar.
 * @author Carlos Salas
 * @date 03/Ene/2026
 */
function changePickedCard() {
  let numero = getRandomCard();
  console.log(numero);
  if (numero === -1) {
    const button = document.getElementById("botonMostrarCarta");
    button.setAttribute("disabled", true);
    return;
  }
  if (numero < 10) {
    numero = "0" + numero;
  }
  const backgroundImg = document.getElementById("contenedorcartas");
  backgroundImg.style.backgroundSize = "cover";
  backgroundImg.style.backgroundImage =
    "url('imgs/cartas/Baraja loteria mexicana_pages-to-jpg-00" +
    numero +
    ".jpg')";
}
