import { initAll, playScream, playWind } from './controls.js'
import { px, selectRandom, getOffset, rnd } from './utils.js'
import { animateStars } from './stars.js'
import { CLIMBERS, KNOWLEDGE } from './config.js'

animateStars()
playWind()

const canon = document.getElementById('canon')
const container = document.getElementById('container')
const knowledge = document.getElementById('knowledge')

let climbersSpeed = 0
let currentXPosition = -50
let currentYPosition = window.innerHeight / 2
let nextBodyFrame = 0

// function createClimber() {
const climber = document.createElement('img')
climber.src = selectRandom(CLIMBERS)
climber.classList.add('climber')
container.appendChild(climber)

// тут прям максимально в лоб задаём вертикальную координату и скорость челика
function resetClimber() {
  currentXPosition = -100
  currentYPosition = rnd(window.innerHeight * 0.2, window.innerHeight)
  climbersSpeed = rnd(4, 10)
}

setInterval(
  () => (climber.src = CLIMBERS[nextBodyFrame++ % CLIMBERS.length]),
  100
)

const moveClimber = setInterval(() => {
  if (currentXPosition >= window.innerWidth) {
    resetClimber()
  } else {
    currentXPosition += climbersSpeed
    climber.style.left = px(currentXPosition)
    climber.style.top = px(currentYPosition)
  }
}, 50)

function checkCollision(ball) {
  const ballX = Math.round(getOffset(ball).left / 10) * 10,
    ballY = Math.round(getOffset(ball).top / 10) * 10,
    climberX = Math.round(getOffset(climber).left / 10) * 10 + 30,
    climberY = Math.round(getOffset(climber).top / 10) * 10

  if (
    ballX <= climberX + 10 &&
    ballX >= climberX - 10 &&
    ballY <= climberY + 10 &&
    ballY >= climberY - 10
  ) {
    console.log('hit')
    playScream(1)
    resetClimber()
  }
}

function createBall(e) {
  knowledge.innerText = selectRandom(KNOWLEDGE)
  const ball = document.createElement('img')
  ball.classList.add('ball', 'mooving')
  ball.src = './assets/img/ball.svg'
  let dY = 75
  let acceleration = 5
  ball.style.bottom = px(dY)
  ball.style.left = px(e.clientX)
  const interval = setInterval(() => {
    acceleration /= 1.0005
    dY += 1 * acceleration
    ball.style.bottom = px(dY)
    checkCollision(ball)
  }, 10)
  setTimeout(() => {
    ball.remove()
    clearInterval(interval)
  }, 2000)
  container.append(ball)
}

document.addEventListener(
  'click',
  () => {
    initAll()
    climbersSpeed = 5
  },
  { once: true }
)

document.addEventListener('mousemove', function (e) {
  canon.style.left = px(e.clientX)
})

document.addEventListener('click', createBall)

