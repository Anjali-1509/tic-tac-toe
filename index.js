let playerText = document.getElementById("playerText")
let restartBtn = document.getElementById("restartBtn")
let boxes = Array.from(document.getElementsByClassName("box"))
console.log("boxes", boxes)

let winnerIndicator= getComputedStyle(document.body).getPropertyValue('--winning-blocks')

let O_TEXT ="O"
let X_TEXT= "X"
let currentPlayer= X_TEXT
let spaces = Array(9).fill(null)
console.log("spaces", spaces)

let startGame=()=>{
boxes.forEach(box => box.addEventListener("click", boxClicked))
}

let boxClicked=(e)=>{
    const id= e.target.id
 
    if(!spaces[id]){
        spaces[id]  = currentPlayer
        e.target.innerText= currentPlayer

        if(playerHasWon() !== false){
            playerText.innerText= `${currentPlayer} has won!!` 
            let winning_blocks= playerHasWon() 
            console.log("winning_blocks", winning_blocks)

            winning_blocks.map(box=> boxes[box].style.backgroundColor= winnerIndicator)
            return
        }

        currentPlayer= currentPlayer== X_TEXT ? O_TEXT : X_TEXT
    
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const playerHasWon=()=>{
for(const condition of winningCombos){
let [a,b,c]=condition
if(spaces[a] && spaces[a] == spaces[b]&& spaces[a]==spaces[c]){
    return [a,b,c]
}
}
return false
}


const restart= ()=>{
    spaces.fill(null)

    boxes.forEach(box=>{
        box.innerText=""
        box.style.backgroundColor= ""
    })

    playerText.innerText= "TiC Tac Toe"
    currentPlayer= X_TEXT
}

restartBtn.addEventListener("click", restart)

startGame()