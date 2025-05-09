// const express = require("express");
// const app = express();

// const path = require("path");
// const http = require("http");
// const {Server} = require("socket.io");

// const server = http.createServer(app);

// const io = new Server(server);
// app.use(express.static(path.resolve("")));

// let arr=[]
// let playingArray=[]

// io.on("connection",(socket)=>{

//     socket.on("find",(e)=>{

//         if(e.userName!==null)
//         {
//             arr.push(e.userName)

//             if(arr.length>=2){
//                 let p1obj={
//                     p1name:arr[0],
//                     p1value:"X",
//                     p1move:""
//                 }
//                 let p2obj={
//                     p2name:arr[1],
//                     p2value:"O",
//                     p2move:""
//                 }
//                 let obj={
//                     p1:p1obj,
//                     p2:p2obj,
//                     sum:1
//                 }
//                 playingArray.push(obj);

//                 arr.splice(0,2);

//                 io.emit("find",{allPlayers:playingArray})
//             }
//         }

//     })


//     socket.on("playing",(e)=>{
//         if(e.value=="X"){
//             let objToChange=playingArray.find(obj=>obj.p1.p1name===e.userName)

//             objToChange.p1.p1move=e.id
//             objToChange.sum++
//         }else if(e.value=="O"){
//             let objToChange=playingArray.find(obj=>obj.p2.p2name===e.userName)

//             objToChange.p2.p2move=e.id
//             objToChange.sum++
//         }
//         io.emit("playing",{allPlayers:playingArray})
//     })

    
// socket.on("Game Over!",(e)=>{
//     playingArray=playingArray.filter(obj=>obj.p1.p1name!==e.userName)
//     console.log(playingArray)
// })

// })


// app.get("/",(req,res)=>{
//     return res.sendFile("basicTictactoe.html")
// });

// server.listen(3000,()=>{
//     console.log("port connected to 3000")
// });









// // for only three placement
// const express = require("express");
// const app = express();
// const path = require("path");
// const http = require("http");
// const { Server } = require("socket.io");

// const server = http.createServer(app);
// const io = new Server(server);
// app.use(express.static(path.resolve("")));

// // Arrays to track waiting players, ongoing games, and player moves
// let waitingPlayers = [];
// let games = [];
// let playingArray = []; // This will track the players and their moves

// io.on("connection", (socket) => {
//     console.log("A player connected: " + socket.id);

//     // When a player is looking for a game
//     socket.on("find", (e) => {
//         if (e.userName) {
//             waitingPlayers.push({ id: socket.id, name: e.userName });

//             // Check if two players are ready for a game
//             if (waitingPlayers.length >= 2) {
//                 const player1 = waitingPlayers.shift();
//                 const player2 = waitingPlayers.shift();

//                 // Initialize a new game
//                 const game = {
//                     id: `${player1.id}-${player2.id}`,
//                     players: {
//                         [player1.id]: { name: player1.name, symbol: "X", move: null },
//                         [player2.id]: { name: player2.name, symbol: "O", move: null },
//                     },
//                     board: Array(9).fill(null), // 3x3 board initialized to null
//                     turn: player1.id, // Player 1 (X) starts first
//                     moveCount: 0,
//                 };

//                 games.push(game);

//                 // Add the game info to playingArray (to track player moves)
//                 playingArray.push({
//                     p1: { p1name: player1.name, p1value: "X", p1move: "" },
//                     p2: { p2name: player2.name, p2value: "O", p2move: "" },
//                     sum: 1
//                 });

//                 // Emit the startGame event to both players
//                 io.to(player1.id).emit("startGame", { symbol: "X", opponent: player2.name });
//                 io.to(player2.id).emit("startGame", { symbol: "O", opponent: player1.name });

//                 // Notify both players that the game has started
//                 io.to(player1.id).emit("whosTurn", "X's Turn");
//                 io.to(player2.id).emit("whosTurn", "O's Turn");
//             }
//         }
//     });

//     // Handle player moves
//     socket.on("playing", (e) => {
//         const game = games.find(g => g.players[e.userName]);
        
//         if (game) {
//             let objToChange;
//             if (e.value === "X") {
//                 objToChange = playingArray.find(obj => obj.p1.p1name === e.userName);
//                 if (objToChange) {
//                     objToChange.p1.p1move = e.id; // Update move for player X
//                     objToChange.sum++;
//                 }
//             } else if (e.value === "O") {
//                 objToChange = playingArray.find(obj => obj.p2.p2name === e.userName);
//                 if (objToChange) {
//                     objToChange.p2.p2move = e.id; // Update move for player O
//                     objToChange.sum++;
//                 }
//             }

//             // Emit updated playing array to both players
//             io.emit("playing", { allPlayers: playingArray });

//             // Emit the current turn to both players
//             io.emit("whosTurn", e.value === 'X' ? "O's Turn" : "X's Turn");

//             // Check for winner or draw
//             checkGameStatus(game);
//         }
//     });

//     // Handle game over (remove the player from the game)
//     socket.on("Game Over!", (e) => {
//         // Remove the player from playingArray when the game ends
//         playingArray = playingArray.filter(obj => obj.p1.p1name !== e.userName && obj.p2.p2name !== e.userName);
//         console.log("Updated playing array after game over:", playingArray);
//     });

//     // Check for winner or draw after each move
//     function checkGameStatus(game) {
//         const winningCombinations = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6],
//         ];

//         // Check for a winner
//         for (const combination of winningCombinations) {
//             const [a, b, c] = combination;
//             if (game.board[a] && game.board[a] === game.board[b] && game.board[a] === game.board[c]) {
//                 io.to(game.id).emit("gameOver", {
//                     message: `${game.board[a]} wins!`,
//                     winningCells: combination,
//                 });
//                 return;
//             }
//         }

//         // Check for a draw
//         if (game.moveCount === 9) {
//             io.to(game.id).emit("gameOver", { message: "It's a draw!" });
//         }
//     }

//     // Disconnect player
//     socket.on("disconnect", () => {
//         console.log("A player disconnected");
//         waitingPlayers = waitingPlayers.filter(player => player.id !== socket.id);
//         // Also remove the player from any ongoing games
//         games = games.filter(game => game.players[socket.id] === undefined);
//         playingArray = playingArray.filter(obj => obj.p1.socketId !== socket.id && obj.p2.socketId !== socket.id);
//     });
// });

// // Serve the game page
// app.get("/", (req, res) => {
//   return res.sendFile("basicTictactoe.html");
// });

// // Start the server
// server.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
