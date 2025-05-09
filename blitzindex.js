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
//                     sum:1
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




