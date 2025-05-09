function bestMove(){
    //AI to make its turn
    let bestScore = -Infinity;
    let bestMove;
    for(let i = 0; i<3;i++) {
        for(let j = 0; j < 3;j++){
            //Is the spot avaible?
            if(board[i][j] == ''){
                board[i][j] = ai;
                let score = minimax(board);
                if(score > bestScore){
                    bestScore = score;
                    bestMove = {i,j};

                }
            }
        }
    }
    board[move.i][move.j] = ai;
    currentPlayer = human;
}

function minimax(board){
    return 1;
}