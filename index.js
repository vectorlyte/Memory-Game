
const playArea = document.getElementById("play-area")
const playBtn = document.getElementById("play")
const boardEl = document.createElement("div")
const scoreEl = document.createElement("h2")
scoreEl.setAttribute("id", "scoreEl")
boardEl.setAttribute("id","boardEl")
const imagePair1 = ["./images/train sunset.png", "./images/cruise.png", "./images/chamil.png", "./images/rain cat.png", "./images/plane.png", "./images/lamp.png"]

let randoms = []
let choices = []
let identity = []
let images = []
let matches = 0
let wrong = 0
let state = false

if(matches === 6){
    const victory = document.createElement("h2")
    victory.innerHTML = `Winner!`
    playArea.appendChild(victory)
}

playBtn.addEventListener("click", function(){
    playArea.appendChild(scoreEl)
    score()
    generateBoard()
    playArea.appendChild(boardEl)
    playArea.removeChild(playBtn)
    state = true
    console.log(state)
})

function score(){
    scoreEl.innerHTML = `Score ~ matches: <span class="correct">${matches}</span> incorrect: <span class="wrong">${wrong}</span>`
}

function submit(num,id){
    if(state === true){
        choices.push(document.getElementById(num))
        identity.push(id)
        
    if(choices.length === 2){
        state = false
    }
        
    document.getElementById(num).setAttribute("style", "filter:none")

    setTimeout(check, 2000)
    
    function check(){
        if(choices.length === 2 && identity.length === 2){
        if(choices[0].src === choices[1].src && identity[0] != identity[1]){
            console.log("match!")
            match = true
            choices[0].removeAttribute("onclick")
            choices[1].removeAttribute("onclick")
            choices = []
            identity = []
            matches++
            score()
        } else {
            console.log("not a match!")
            
            choices[0].setAttribute("style", "filter: contrast(0)")
            // choices[0].setAttribute("style", "transition-delay: 3s")
            choices[1].setAttribute("style", "filter: contrast(0)")
            // choices[1].setAttribute("style", "transition-delay: 3s")
            identity = []
            choices = []
            wrong++
            score()
            }
        }
        state = true
    }
}}


function generateBoard() {
let count = 2
let id = 0
while(count){   
rand()
    let content = ''
for(let i = 0; i < imagePair1.length; i++){
    src = imagePair1[randoms[i]]
    id++
    content += `
    <img id="${id}" class="image" src="${src}" onclick="submit(${id},${id})" alt="">`
    images.push(id)
    }
randoms = []
boardEl.innerHTML += content
count--
}

}

function rand(){

count = 1

function random(num) {
    let usedNums = num
    r1 = Math.floor(Math.random() * 6)
    for(let i = 0; i < usedNums.length; i++){
    if(r1 === usedNums[i]){
        return null
    }
    }
    return r1
}       

if(randoms.length < 1){
        randoms.push(Math.floor(Math.random() * 6)) 
        } 
        for(let i = 0; i < count; i++){
            count++
            nextRandom = random(randoms)
            if(nextRandom === null){
                dupe = true
                } else {
                randoms.push(nextRandom)
                }
            if(randoms.length === 6){
            count = 0
            } else if(count >  100){
                count = 0
            }
        }
    return randoms
}


