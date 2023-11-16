function Gameboard () {
    const board = [];
    const rows = 3;
    const columns = 3;

    for (let i =0; i<rows; i++) {
        board[i] = [];
        for (let j=0; j<columns; j++) {
            board[i].push(Square());
        }
    }
    const getSquare = (row,col) => board[row][col];
    const getBoard = () => board;
    const getPlayerBoard = () => board.map((row) => row.map((square) => square.getValue()));
    const placeMarker =  (square, player) => {
        if (!square.getValue()) {
            square.addMarker(player);
        }
        return getPlayerBoard();
    }
    
    const printBoard = () => {
        const boardWithSquareValues = getPlayerBoard();
        return boardWithSquareValues
    }

    const checkWinCondition = (player) => {
        for (let i =0; i<rows; i++) {
            if (board[i].every((square)=> square.getValue() === player)) {
                return true;
            }
        }
        for (let j = 0; j < columns; j++) {
            if (board.every((row)=> row[j].getValue() === player)) {
                return true;
            }
        }
        if (
            (board[0][0].getValue() === player && board[1][1].getValue() === player && board[2][2].getValue() === player) ||
            (board[0][2].getValue() === player && board[1][1].getValue() === player && board[2][0].getValue() === player) 
        ) {
            return true;
        }
        return false;

    }

    return {getPlayerBoard, getSquare, getBoard, placeMarker, printBoard, checkWinCondition};



}

function Square() {
    let value = null;
    const addMarker = (player) => {
        value = player;
    }
    const getValue = () => value;

    return {
        addMarker,
        getValue
    }
}



function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two",) {
    const board = Gameboard();
    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ]

    let activePlayer = players[0];
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.log(`${getActivePlayer().name}'s turn.`);
    }
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
    }

    const playRound = (index) => {
        const square = board.getBoard()[Math.floor(index/3)][index%3];
        console.log(
            `Dropping${getActivePlayer().name}'s token onto board`
        )
        board.placeMarker(square, getActivePlayer().token);
        printNewRound();
        newGameDisplay.updateDisplay();


        if (board.checkWinCondition(getActivePlayer().token)){
            console.log(`${getActivePlayer().name} wins!`);
        } else {
        switchPlayerTurn();
        }
    }
    printNewRound();

    return {
        playRound,
        printNewRound
    }
}


const gameboard = Gameboard();
const game = new GameController("Rikko","Rikko2",gameboard);
const newGameDisplay = new DomDisplay(gameboard, game);
newGameDisplay.updateDisplay();

function DomDisplay(gameboard, game) {
    const boardContainer = document.getElementById("boardContainer");
    const displayBoard = () => {
        const playerBoard = gameboard.getPlayerBoard();
        console.log(playerBoard);
        boardContainer.innerHTML = "";
        for (let i=0; i<playerBoard.length; i++) {
            for (let j=0; j<playerBoard[i].length; j++) {
            const square = gameboard.getSquare(i,j);
            const squareValue = square.getValue();
            const squareElement = document.createElement("div");
            const index = i * playerBoard.length + j;
            squareElement.classList.add("square");
            squareElement.textContent= squareValue != null ? squareValue: "";
            squareElement.dataset.squareIndex = index;
            boardContainer.appendChild(squareElement);
            squareElement.addEventListener("click", () => game.playRound(index));
            }
        }
    }
    const updateDisplay = () => {
        displayBoard();
    }
    return { updateDisplay };
}

