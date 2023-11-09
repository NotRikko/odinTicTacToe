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
    const getBoard = () => board;
    const placeMarker = (square, player) => {
        if (!square.getValue()) {
            square.addMarker(player);
        }
    }
    
    const printBoard = () => {
        const boardWithSquareValues = board.map((row) => row.map((square) => square.getValue()));
        console.log(boardWithSquareValues);
    }

    return {getBoard, placeMarker, printBoard};



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
    playerTwoName = "Player Two") {
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
    }
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (index) => {
        const square = board.getBoard()[Math.floor(index/3)][index%3];
        console.log(
            `Dropping${getActivePlayer().name}'s token onto board`
        )
        board.placeMarker(square, getActivePlayer().token);

        switchPlayerTurn();
        printNewRound();
    }
    printNewRound();

    return {
        playRound,
    }
}


const game = new GameController();
