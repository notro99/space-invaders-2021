const grid = document.querySelector('.grid')
let shooterPos = 202;
let width = 15;
let direction = 1;
let invaderID;
let goingRight = true;
let aliensRemoved = [];
const resultDisplay = document.querySelector('.results')
const gameStateDisplay = document.querySelector('.gameState')
let results = 0;
let timeout = 1000;
var person
let isGameOn = true;
let minus=0;
var laserSound;


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
        for(let i = 0; i < alien.length; i++){
            alien[i] += width+1
            direction = -1;
            goingRight = false;
        }
    }

    if(leftSide && !goingRight){
        for(let i = 0; i < alien.length; i++){
            alien[i] += width-1
            direction = 1;
            goingRight = true;
        }
    }



    for(let i = 0; i< alien.length; i++){
        alien[i] += direction
    }
    draw()

    if (squares[shooterPos].classList.contains('invader', 'shooter')) {
        gameStateDisplay.innerHTML = 'GAME OVER'
        endGame()
    }

    for (let i = 0; i < alien.length; i++) {
        if(alien[i] > (squares.length)) {
            gameStateDisplay.innerHTML = 'GAME OVER'
            endGame()
        }
    }
    if(aliensRemoved.length === alien.length){
        gameStateDisplay.innerHTML = 'NYERT??L!'
        endGame()
    }

}
function endGame(){
    person = prompt("J??t??kosn??v:", "Multim??dia user");
    results = results/minus*100;
    localStorage.setItem(person, results);

   fill_toplist()

    remove()
    isGameOn = false;
}



function start() {
    laserSound = new Audio("assets/laser.mp3");
    if (isGameOn) {
        setTimeout(function () {
            alienMove()
            minus++,
            start();
        }, timeout);
    }
}
localStorageFill()

start()

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
            resultDisplay.innerHTML = "KIIKTATVA: " + results;



        }
    }
    switch (e.key) {
        case 'ArrowUp':
            laserSound.play();
            laserId = setInterval(moveLaser,100)
    }
}

document.addEventListener('keyup', shoot)


function fill_toplist() {

    var data = [];
    for (var i = 0; i < localStorage.length; i++) {
        data[i] = [localStorage.key(i), parseInt(localStorage.getItem(localStorage.key(i)))];
    }

    data.sort(function (a, b) {

        return b[1] - a[1];
    });

    for (let act_data of data.keys()) {

        if (act_data < 10) {
            $('#list').append(data[act_data][0] + ' | ' + data[act_data][1] + '<br><hr>');
        }
    }
}


function localStorageFill(){
    localStorage.setItem("P??lda B??la", 23);
    localStorage.setItem("??d??n", 5 );
    localStorage.setItem("CreeperSlayer42", 22);
    localStorage.setItem("Nemadommeganevem", 12 );
    localStorage.setItem("??bel", 100);
}

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);