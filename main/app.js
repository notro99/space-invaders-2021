const grid = document.querySelector('.grid')
let shooterPos = 202;
let width = 15;
let direction = 1
let invaderID;
let goingRight = true;
let aliensRemoved = [];
const resultDisplay = document.querySelector('.results')
let results = 0


for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares  = Array.from(document.querySelectorAll('.grid div'))

const alien = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw() {
    for (let i = 0; i < alien.length; i++) {
        if(!aliensRemoved.includes(i)) {
            squares[alien[i]].classList.add('invader')
        }
    }
}

function remove() {
    for (let i = 0; i < alien.length; i++) {

        squares[alien[i]].classList.remove('invader')

    }
}
squares[shooterPos].classList.add('shooter')

function moveShooter(e) {
    squares[shooterPos].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft':
            if (shooterPos % width !== 0) {
                shooterPos -=1
            }
            break
        case 'ArrowRight' :
            if (shooterPos % width < width -1){
                shooterPos +=1
            }
            break
    }
    squares[shooterPos].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

function alienMove(){
    const leftSide = alien[0] % width === 0
    const rightEdge = alien[alien.length - 1] % width === width -1
    remove()

    if(rightEdge && goingRight){
        for(let i = 0; i <alien.length; i++){
            alien[i] += width+1
            direction = -1;
            goingRight = false;
        }
    }

    if(leftSide && !goingRight){
        for(let i = 0; i <alien.length; i++){
            alien[i] += width-1
            direction = 1;
            goingRight = true;
        }
    }

    for(let i = 0; i<alien.length; i++){
        alien[i] += direction
    }
    draw()

    if (squares[shooterPos].classList.contains('invader', 'shooter')) {
        resultDisplay.innerHTML = 'GAME OVER'
        clearInterval(invaderID)
    }

    for (let i = 0; i < alien.length; i++) {
        if(alien[i] > (squares.length)) {
            resultDisplay.innerHTML = 'GAME OVER'
            clearInterval(invaderID)
        }
    }
    if(aliensRemoved.length === alien.length){
        resultDisplay.innerHTML = 'Nyertél!'
        clearInterval(invaderID)
    }


}

invaderID = setInterval(alienMove, 500)

function shoot(e){
    let laserId
    let currentLaserIndex = shooterPos
    function moveLaser(){
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')

        if(squares[currentLaserIndex].classList.contains('invader'))
        {
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')

            setTimeout(()=>squares[currentLaserIndex].classList.remove('boom'),300)
            clearInterval(laserId)

            const alienRemoved = alien.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            resultDisplay.innerHTML = results;

        }
    }
    switch (e.key) {
        case 'ArrowUp':
            laserId = setInterval(moveLaser,100)
    }
}

document.addEventListener('keydown', shoot)