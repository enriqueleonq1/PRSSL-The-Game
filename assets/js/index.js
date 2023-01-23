let $ = selector => document.querySelector(selector)

/* Changing Card User Elements With Click Event */

/*PreCharging images*/
let imageScissors = new Image()
imageScissors.src = "assets/images/scissors-hand.png"
let imageRock = new Image()
imageRock.src = "assets/images/rock-hand.png"
let imagePaper = new Image()
imagePaper.src = "assets/images/paper-hand.png"
let imageSpock = new Image()
imageSpock.src = "assets/images/spock-hand.png"
let imageLizard= new Image()
imageLizard.src = "assets/images/lizard-icon.png"
let robotImg= new Image()
robotImg.src = "assets/images/robot_face.png"

let elements = [
    {
        name: "Scissors",
        imagePath: imageScissors,
        borderColor: "scissors"
    },
    {
        name: "Rock",
        imagePath: imageRock,
        borderColor: "rock"
    },
    {
        name: "Paper",
        imagePath: imagePaper,
        borderColor: "paper"
    },
    {
        name: "Spock",
        imagePath: imageSpock,
        borderColor: "spock"
    },
    {
        name: "Lizard",
        imagePath: imageLizard,
        borderColor: "lizard"
    },
]

let whoWin = {
    Paper: ["Spock","Rock"],
    Rock: ["Scissors","Lizard"],
    Lizard: ["Paper","Spock"],
    Spock: ["Scissors","Rock"],
    Scissors: ["Lizard","Paper"]
}

let pointer = 0
let classPointer = 0

/*Getting arrow elements of dom*/
let leftArrow = $("#left-arrow")
let rigthArrow = $("#rigth-arrow")


leftArrow.addEventListener("click", function () {
    if( pointer === 0 ) {
        pointer  = 4
        classPointer = 0
    } else {
        classPointer = pointer   
        pointer = pointer - 1
    }
    
    let  {name, imagePath, borderColor} = elements[pointer]
    let cardGame = $("#cardType")
    let titleCard = $(".card-game__title")
    titleCard.innerText = name
    cardGame.removeChild( cardGame.firstElementChild )
    cardGame.classList.remove(elements[classPointer].borderColor)
    cardGame.classList.add(borderColor)
    cardGame.appendChild( imagePath )
})

rigthArrow.addEventListener("click", function () {

    if( pointer === 4 ) {
        pointer  = 0
        classPointer = 4
    } else {
        classPointer = pointer   
        pointer = pointer + 1
    }
    
    let  {name, imagePath, borderColor} = elements[pointer]
    let cardGame = $("#cardType")
    let titleCard = $(".card-game__title")
    titleCard.innerText = name
    cardGame.removeChild( cardGame.firstElementChild )
    cardGame.classList.remove(elements[classPointer].borderColor)
    cardGame.classList.add(borderColor)
    cardGame.appendChild( imagePath )
})

let button = $("#play")
button.addEventListener("click", ( event ) => {
    let randomNumber = Math.floor( Math.random() * 5)
    let title = $(".vs-title")
    if( randomNumber === pointer ) {
        title.innerText = "Draw🤝"
        title.style.color = "#fffffe"
        changeComputerImage( randomNumber )
        backDefaultText(title,"Vs","#eebbc3", 1500)
    } 
    else {
        let userSelection = elements[pointer].name
        let computerSelection = elements[randomNumber].name
        if( whoWin[userSelection].includes( computerSelection )  ) {
            title.innerText = "You Win🎉"
            title.style.color = "#2cb67d"
            changeComputerImage( randomNumber )
            backDefaultText(title,"Vs","#eebbc3", 1500)
        }else {
            title.innerText = "You Lose😥"
            title.style.color = "#f45d48"
            changeComputerImage( randomNumber )
            backDefaultText(title,"Vs","#eebbc3", 1500)
        }
    }
})

function backDefaultText( element, text, color, timer ) {
    setTimeout(()=>{
        element.innerText = text
        element.style.color = color
    }, timer )
}

function changeComputerImage( computerSelection ) {
    let computerImg = $("#computer")
    computerImg.src = elements[computerSelection].imagePath.src
    setTimeout(() => {
        computerImg.src = robotImg.src
    },1500)
}