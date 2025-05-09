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
//                 let p1obj = {
//                     p1name: arr[0],
//                     p1value: "X",
//                     p1moves: [] // changed from single move to array
//                 };
//                 let p2obj = {
//                     p2name: arr[1],
//                     p2value: "O",
//                     p2moves: []
//                 };
//                 let obj={
//                     p1:p1obj,
//                     p2:p2obj,
//                     sum:10001  // Works and Draw wont pop up. but a small check could be done
//                 }
//                 playingArray.push(obj);

//                 arr.splice(0,2);

//                 io.emit("find",{allPlayers:playingArray})
//             }
//         }

//     })


//     socket.on("playing", (e) => {
//         if (e.value === "X") {
//             const obj = playingArray.find(obj => obj.p1.p1name === e.userName);
//             if (obj) {
//                 obj.p1.p1moves.push(e.id);
//                 if (obj.p1.p1moves.length > 3) obj.p1.p1moves.shift(); // Keep only 3
//                 obj.sum++;
//             }
//         } else if (e.value === "O") {
//             const obj = playingArray.find(obj => obj.p2.p2name === e.userName);
//             if (obj) {
//                 obj.p2.p2moves.push(e.id);
//                 if (obj.p2.p2moves.length > 3) obj.p2.p2moves.shift(); // Keep only 3
//                 obj.sum++;
//             }
//         }
//         io.emit("playing", { allPlayers: playingArray });
//     });

    
// socket.on("Game Over!",(e)=>{
//     playingArray=playingArray.filter(obj=>obj.p1.p1name!==e.userName)
//     console.log(playingArray)
// })

// })


// app.get("/",(req,res)=>{
//     return res.sendFile("blitzTicTacToe.html")
// });

// server.listen(3000,()=>{
//     console.log("port connected to 3000")
// });


// const express = require("express");
// const app = express();
// const path = require("path");
// const http = require("http");
// const { Server } = require("socket.io");

// const server = http.createServer(app);
// const io = new Server(server);

// // Serve static files (HTML, CSS, JS)
// app.use(express.static(path.resolve("")));

// // === CLASSIC MODE ===
// const classic = io.of("/classic");
// let classicQueue = [];
// let classicGames = [];

// classic.on("connection", (socket) => {
//     console.log("User connected to CLASSIC");

//     socket.on("find", (e) => {
//         if (e.userName) {
//             classicQueue.push(e.userName);
//             if (classicQueue.length >= 2) {
//                 const game = {
//                     p1: { p1name: classicQueue[0], p1value: "X", p1move: "" },
//                     p2: { p2name: classicQueue[1], p2value: "O", p2move: "" },
//                     sum: 1
//                 };
//                 classicGames.push(game);
//                 classicQueue.splice(0, 2);
//                 classic.emit("find", { allPlayers: classicGames });
//             }
//         }
//     });

//     socket.on("playing", (e) => {
//         const game = classicGames.find(g => g.p1.p1name === e.userName || g.p2.p2name === e.userName);
//         if (game) {
//             if (e.value === "X") game.p1.p1move = e.id;
//             if (e.value === "O") game.p2.p2move = e.id;
//             game.sum++;
//             classic.emit("playing", { allPlayers: classicGames });
//         }
//     });

//     socket.on("Game Over!", (e) => {
//         classicGames = classicGames.filter(g => g.p1.p1name !== e.userName && g.p2.p2name !== e.userName);
//     });
// });

// // === BLITZ MODE ===
// const blitz = io.of("/blitz");
// let blitzQueue = [];
// let blitzGames = [];

// blitz.on("connection", (socket) => {
//     console.log("User connected to BLITZ");

//     socket.on("find", (e) => {
//         if (e.userName) {
//             blitzQueue.push(e.userName);
//             if (blitzQueue.length >= 2) {
//                 const game = {
//                     p1: { p1name: blitzQueue[0], p1value: "X", p1moves: [] },
//                     p2: { p2name: blitzQueue[1], p2value: "O", p2moves: [] },
//                     sum: 10001
//                 };
//                 blitzGames.push(game);
//                 blitzQueue.splice(0, 2);
//                 blitz.emit("find", { allPlayers: blitzGames });
//             }
//         }
//     });

//     socket.on("playing", (e) => {
//         const game = blitzGames.find(g => g.p1.p1name === e.userName || g.p2.p2name === e.userName);
//         if (game) {
//             if (e.value === "X") {
//                 game.p1.p1moves.push(e.id);
//                 if (game.p1.p1moves.length > 3) game.p1.p1moves.shift();
//             } else if (e.value === "O") {
//                 game.p2.p2moves.push(e.id);
//                 if (game.p2.p2moves.length > 3) game.p2.p2moves.shift();
//             }
//             game.sum++;
//             blitz.emit("playing", { allPlayers: blitzGames });
//         }
//     });

//     socket.on("Game Over!", (e) => {
//         blitzGames = blitzGames.filter(g => g.p1.p1name !== e.userName && g.p2.p2name !== e.userName);
//     });
// });

// // Serve home page (main menu)
// app.get("/", (req, res) => {
//     res.sendFile(path.resolve("index.html"));
// });

// server.listen(3000, () => {
//     console.log("Server is running on http://localhost:3000");
// });
