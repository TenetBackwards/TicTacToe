window.addEventListener('DOMContentLoaded', () => {
    // const socket = io("/classic");
    const socket = io("https://tictactoe-194a.onrender.com/classic", {
  transports: ["websocket"]
});




socket.on("connect", () => {
    console.log("Connected to the server!");
});

socket.on("connect_error", (err) => {
    console.error("Connection failed:", err.message);
});

socket.on("find", (data) => {
    console.log("Game data:", data);
});


    let userName;

    // Get elements
    const loading = document.getElementById("loading");
    const bigContainer = document.getElementById("bigContainer");
    const userCont = document.getElementById("userCont");
    const oppNameCont = document.getElementById("oppNameCont");
    const valueCont = document.getElementById("valueCont");
    const whosTurn = document.getElementById("whosTurn");
    const findBtn = document.getElementById("find");
    const playBotBtn = document.getElementById("playBot");
    const userNameInput = document.getElementById("userName");

    const enterNameLabel = document.getElementById("enterName");
    const userNameDisplay = document.getElementById("user");
    const oppNameDisplay = document.getElementById("oppName");
    const valueDisplay = document.getElementById("value");

    if (
        !loading || !bigContainer || !userCont || !oppNameCont || !valueCont || !whosTurn ||
        !findBtn || !userNameInput || !enterNameLabel || !userNameDisplay || !oppNameDisplay || !valueDisplay
    ) {
        console.error("❌ One or more DOM elements not found. Check your HTML element IDs.");
        return;
    }

    // Initial visibility
    loading.style.display = "none";
    bigContainer.style.display = "none";
    userCont.style.display = "none";
    oppNameCont.style.display = "none";
    valueCont.style.display = "none";
    whosTurn.style.display = "none";

    // On "Find" button click
    findBtn.addEventListener("click", () => {
        userName = userNameInput.value.trim();
        userNameDisplay.innerText = userName;

        if (!userName) {
            alert("Please enter a name");
            return;
        }

        socket.emit("find", { userName: userName });

        loading.style.display = "block";
        findBtn.disabled = true;
    });

    // On finding a match
    socket.on("find", (e) => {
        const allPlayersArray = e.allPlayers;
        const foundObject = allPlayersArray.find(obj => obj.p1.p1name === userName || obj.p2.p2name === userName);

        if (!foundObject) return;

        let oppName, value;

        if (foundObject.p1.p1name === userName) {
            oppName = foundObject.p2.p2name;
            value = foundObject.p1.p1value;
        } else {
            oppName = foundObject.p1.p1name;
            value = foundObject.p2.p2value;
        }

        oppNameDisplay.innerText = oppName;
        valueDisplay.innerText = value;

        userCont.style.display = "block";
        oppNameCont.style.display = "block";
        valueCont.style.display = "block";
        loading.style.display = "none";
        userNameInput.style.display = "none";
        findBtn.style.display = "none";
        playBotBtn.style.display = "none";
        enterNameLabel.style.display = "none";
        bigContainer.style.display = "block";
        whosTurn.style.display = "block";
        whosTurn.innerText = "X's Turn";
    });

    // On player move
    document.querySelectorAll(".btn").forEach((e) => {
        e.addEventListener("click", function () {
            const value = document.getElementById("value").innerText;
            const currentTurn = document.getElementById("whosTurn").innerText.charAt(0);
    
            if (value === currentTurn && e.innerText === "") {
                e.innerText = value;
                socket.emit("playing", { value: value, id: e.id, userName: userName }); // Ensure userName is defined
            }
        });
    });

    // Update board on move
    socket.on("playing", (e) => {
        const foundObject = e.allPlayers.find(obj => obj.p1.p1name === userName || obj.p2.p2name === userName);
        if (!foundObject) return;

        const { p1, p2, sum } = foundObject;

        whosTurn.innerText = (sum % 2 === 0) ? "O's Turn" : "X's Turn";

        if (p1.p1move) {
            const el = document.getElementById(p1.p1move);
            if (el) {
                el.innerText = "X";
                el.disabled = true;
                el.style.color = "black";
            }
        }

        if (p2.p2move) {
            const el = document.getElementById(p2.p2move);
            if (el) {
                el.innerText = "O";
                el.disabled = true;
                el.style.color = "black";
            }
        }

        checkWinner(sum);
    });

    // Win / Draw check
    function checkWinner(sum) {
        const getVal = id => document.getElementById(id).innerText || id;

        const b1 = getVal("btn1"), b2 = getVal("btn2"), b3 = getVal("btn3");
        const b4 = getVal("btn4"), b5 = getVal("btn5"), b6 = getVal("btn6");
        const b7 = getVal("btn7"), b8 = getVal("btn8"), b9 = getVal("btn9");

        const win =
            (b1 === b2 && b2 === b3) || (b4 === b5 && b5 === b6) ||
            (b7 === b8 && b8 === b9) || (b1 === b4 && b4 === b7) ||
            (b2 === b5 && b5 === b8) || (b3 === b6 && b6 === b9) ||
            (b1 === b5 && b5 === b9) || (b3 === b5 && b5 === b7);

            if (win) {
                socket.emit("Game Over!", { userName: userName });
            
                const winner = (sum % 2 === 0 ? "X" : "O");
                const message = (valueDisplay.innerText === winner) ? "You Win!" : "Opponent Wins!";
                whosTurn.innerText = message;
            
                setTimeout(() => {
                    alert(message);
                    setTimeout(() => location.reload(), 200);
                }, 100);
            } else if (sum === 10) {
                socket.emit("Game Over!", { userName: userName });
            
                whosTurn.innerText = "It's a draw!";
                setTimeout(() => {
                    alert("DRAW!!");
                    setTimeout(() => location.reload(), 200);
                }, 100);
            }
    }
});
