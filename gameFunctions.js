window.addEventListener('DOMContentLoaded', () => {

document.querySelectorAll(".btn").forEach(e => {
    e.addEventListener("click", function () {
        let value = document.getElementById("value").innerText
        e.innerText = value

        socket.emit("playing", { value: value, id: e.id, userName: userName })

    })
})

socket.on("playing", (e) => {
    const foundObject = (e.allPlayers).find(obj => obj.p1.p1name == `${userName}` || obj.p2.p2name == `${userName}`);

    p1id = foundObject.p1.p1move
    p2id = foundObject.p2.p2move

    if ((foundObject.sum) % 2 == 0) {
        document.getElementById("whosTurn").innerText = "O's Turn"
    }
    else {
        document.getElementById("whosTurn").innerText = "X's Turn"
    }

    if (p1id != '') {
        document.getElementById(`${p1id}`).innerText = "X"
        document.getElementById(`${p1id}`).disabled = true
        document.getElementById(`${p1id}`).style.color = "black"
    }
    if (p2id != '') {
        document.getElementById(`${p2id}`).innerText = "O"
        document.getElementById(`${p2id}`).disabled = true
        document.getElementById(`${p2id}`).style.color = "black"
    }

    check(userName, foundObject.sum)


})


function check(userName,sum){
    
    document.getElementById("btn1").innerText == '' ? b1 = "a" : b1 = document.getElementById("btn1").innerText
    document.getElementById("btn2").innerText == '' ? b2 = "b" : b2 = document.getElementById("btn2").innerText
    document.getElementById("btn3").innerText == '' ? b3 = "c" : b3 = document.getElementById("btn3").innerText
    document.getElementById("btn4").innerText == '' ? b4 = "d" : b4 = document.getElementById("btn4").innerText
    document.getElementById("btn5").innerText == '' ? b5 = "e" : b5 = document.getElementById("btn5").innerText
    document.getElementById("btn6").innerText == '' ? b6 = "f" : b6 = document.getElementById("btn6").innerText
    document.getElementById("btn7").innerText == '' ? b7 = "g" : b7 = document.getElementById("btn7").innerText
    document.getElementById("btn8").innerText == '' ? b8 = "h" : b8 = document.getElementById("btn8").innerText
    document.getElementById("btn9").innerText == '' ? b9 = "i" : b9 = document.getElementById("btn9").innerText

    if ((b1 == b2 && b2 == b3) || (b4 == b5 && b5 == b6) || (b7 == b8 && b8 == b9) || (b1 == b4 && b4 == b7) || (b2 == b5 && b5 == b8) || (b3 == b6 && b6 == b9) || (b1 == b5 && b5 == b9) || (b3 == b5 && b5 == b7)){

        socket.emit("Game Over!",{userName:userName})

        setTimeout(()=>{

            sum%2==0 ? alert("X WON !!") : alert("O WON !!")

            setTimeout(()=>{
                location.reload()

            },200)
        },100)


    }
    else if(sum==10){
        
        socket.emit("Game Over!",{userName:userName})

        setTimeout(()=>{

            alert("DRAW!!")

            setTimeout(()=>{
                location.reload()

            },200)
        },100)
    }

}
});