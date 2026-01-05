let shownCards = [];
let baseCards = [];
const board21 = [1, 21, 20, 36, 32, 38, 13, 51, 37, 29, 30, 42, 50, 54, 53, 39];
const board17 = [1, 48, 49, 50, 52, 53, 54, 47, 40, 10, 19, 20, 30, 31, 29, 11];
const board19 = [30, 31, 32, 33, 39, 40, 41, 42, 48, 49, 50, 51, 13, 22, 2, 3];
let playingBoards = [[...board17], [...board19]];
let chorroWinner = false;
let cornersWin = false;
let centerWin = false;
let fullBoardWin = false;

/**
 * Reinicia el arreglo con las cartas de la baraja y quita la carta actual.
 * @author Carlos Salas
 * @date 03/Ene/2026
 */
function resetCards() {
  baseCards = [];
  chorroWinner = false;
  cornersWin = false;
  centerWin = false;
  fullBoardWin = false;
  playingBoards = [[...board17], [...board19]];
  console.log(playingBoards + " al reiniciar");
  console.log(board17);
  console.log(board19);
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
  const pickedRandomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
  const selectedCard = baseCards[pickedRandomIndex];
  baseCards.splice(pickedRandomIndex, 1);
  return selectedCard;
}

/**
 * Cambia la imágen del contenedor de la carta actual.
 * La carta seleccionada se basa en las cartas faltantes por mostrar.
 * @author Carlos Salas
 * @date 03/Ene/2026
 */
function changePickedCard() {
  let shownCardPic = "";
  let selectedCard = getRandomCard();
  console.log(selectedCard);
  if (selectedCard === -1) {
    const button = document.getElementById("botonMostrarCarta");
    button.setAttribute("disabled", true);
    return;
  }
  if (selectedCard < 10) {
    shownCardPic = "0" + selectedCard;
  } else {
    shownCardPic = selectedCard;
  }
  const backgroundImg = document.getElementById("contenedorcartas");
  backgroundImg.style.backgroundSize = "cover";
  backgroundImg.style.backgroundImage =
    "url('imgs/cartas/Baraja loteria mexicana_pages-to-jpg-00" +
    shownCardPic +
    ".jpg')";
  markBoard(selectedCard);
  checkPrizingCondition();
}

function checkPrizingCondition() {
  checkChorroWinner();
  checkCornersWin();
  checkCenterWin();
  checkFullBoardWin();
}

/**
 * Revisa las condiciones de premio para ver si se ganó el chorro.
 * @returns {boolean} true si ganó, falso si no se ha ganado.
 *
 * @author Carlos Salas
 * @date 04/Ene/2026
 */
function checkChorroWinner() {
  if (chorroWinner) {
    return;
  }
  playingBoards.forEach((board) => {
    const row1 = [board[0], board[1], board[2], board[3]];
    const row2 = [board[4], board[5], board[6], board[7]];
    const row3 = [board[8], board[9], board[10], board[11]];
    const row4 = [board[12], board[13], board[14], board[15]];
    const col1 = [board[0], board[4], board[8], board[12]];
    const col2 = [board[1], board[5], board[9], board[13]];
    const col3 = [board[2], board[6], board[10], board[14]];
    const col4 = [board[4], board[7], board[11], board[15]];
    const diag1 = [board[0], board[5], board[10], board[15]];
    const diag2 = [board[3], board[6], board[9], board[12]];
    const isAWinner =
      row1.every((item) => item === null) ||
      row2.every((item) => item === null) ||
      row3.every((item) => item === null) ||
      row4.every((item) => item === null) ||
      col1.every((item) => item === null) ||
      col2.every((item) => item === null) ||
      col3.every((item) => item === null) ||
      col4.every((item) => item === null) ||
      diag1.every((item) => item === null) ||
      diag2.every((item) => item === null);
    if (isAWinner) {
      console.log("¡Chorro!");
      chorroWinner = true;
    }
  });
}

/**
 * Revisa las condiciones de premio para determinar si ganó 4 esquinas.
 * @returns {boolean} true si ganó, falso si no ha ganado
 * @author Carlos Salas
 * @date 04/Ene/2026
 */
function checkCornersWin() {
  if (cornersWin) {
    return;
  }
  playingBoards.forEach((board) => {
    const corners = [board[0], board[3], board[12], board[15]];
    const isAWinner = corners.every((item) => item === null);
    if (isAWinner) {
      console.log("¡4 Esquinas!");
      cornersWin = true;
    }
  });
}

/**
 * Revisa las condiciones de premio para determinar si ganó el centro.
 * @returns {boolean} true si ganó, falso si no ha ganado
 * @author Carlos Salas
 * @date 04/Ene/2026
 */
function checkCenterWin() {
  if (centerWin) {
    return;
  }
  playingBoards.forEach((board) => {
    const center = [board[5], board[6], board[9], board[10]];
    const isAWinner = center.every((item) => item === null);
    if (isAWinner) {
      console.log("¡Centro!");
      centerWin = true;
    }
  });
}

/**
 * Revisa las condiciones de premio para determinar si ganó la llena.
 * @returns {boolean} true si ganó, falso si no ha ganado
 * @author Carlos Salas
 * @date 04/Ene/2026
 */
function checkFullBoardWin() {
  if (fullBoardWin) {
    return;
  }
  playingBoards.forEach((board) => {
    const isAWinner = board.every((item) => item === null);
    if (isAWinner) {
      console.log("¡Buenas!");
      fullBoardWin = true;
    }
  });
}

/**
 * Determina si la carta mostrada se encuentra en el tablero y la marca.
 *
 * @param {number} selectedCard - Carta mostrada
 *
 * @author Carlos Salas
 * @date 04/Ene/2026
 */
function markBoard(selectedCard) {
  playingBoards.forEach((board) => {
    if (board.includes(selectedCard)) {
      foundCardIndex = board.indexOf(selectedCard);
      board[foundCardIndex] = null;
    }
  });
}
