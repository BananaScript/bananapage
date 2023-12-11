const canvas = document.getElementById('stars')

const dayNightCycle = 120000,
      starBornInterval = 500

var context = canvas.getContext('2d')
var W = window.innerWidth
var H = window.innerHeight

canvas.width = W
canvas.height = H

context.shadowBlur = 10
context.shadowColor = 'white'

export function animateStars() {
  let x = W * Math.random()
  let y = H * Math.random()
  let r = 2 * Math.random()

  context.beginPath()
  context.fillStyle = 'white'
  context.arc(x, y, r, 0, Math.PI * 2)
  context.fill()

  setTimeout(animateStars, starBornInterval)
}

setInterval(() => {
  console.log('clearstars')
  context.clearRect(0, 0, W, H)
}, dayNightCycle)
