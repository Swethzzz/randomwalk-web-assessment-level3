window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;


    // scoreboard players added 
    let player1Name = "Player1";
    let player2Name = "Player2";
    let playerXScore = 0;
    let playerOScore = 0;


    // changing players and displaying their names 
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? player1Name : player2Name;
    playerDisplay.innerText = currentPlayer === 'X' ? player1Name : player2Name;
    playerDisplay.classList.add(`player${currentPlayer}`);

    
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }


    // displayig winner 
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = `${player2Name} (<span class="playerO">O</span>) Won`;
                playerOScore++;
                break;
            case PLAYERX_WON:
                announcer.innerHTML = `${player1Name} (<span class="playerX">X</span>) Won`;
                playerXScore++;
                break;
            case TIE:
                announcer.innerText = 'Tie';
                break;
        }

        updateScoreboard();
        announcer.classList.remove('hide');
    };
    


    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    // game board update 
    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    // scoreboard update 
    const updateScoreboard = () => {
        document.getElementById('playerXScore').innerText = `${player1Name} (X): ${playerXScore}`;
        document.getElementById('playerOScore').innerText = `${player2Name} (O): ${playerOScore}`;
    };
    
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    // scoreboard content 
    
    const resetBoard = () => {
        player1Name = prompt("Enter Player 1 name:", "Player 1") || "Player 1";  // if no name entered default player 1 displayed ;
        player2Name = prompt("Enter Player 2 name:", "Player 2") || "Player 2";  
        playerXScore = 0;   // initializing players score for scoreboard ;
        playerOScore = 0;
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');
    
        if (currentPlayer === 'O') {
            changePlayer();
        }
    
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    
        updateScoreboard();
    };
    
    
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);

});