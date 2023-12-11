import { animateStars } from './stars.js'

const header = document.querySelector('header')
const text = document.getElementById('intro')
const soundBtn = document.getElementById('sound-btn')
const timer = document.getElementById('timer')

let soundBtnState = true
let volumeWind = 0.2
let volumeBeat = 0.5
let volumeScream = 0.2

const audioWind = new Audio('./assets/sound/wind.mp3')
const audioBeat = new Audio('./assets/sound/beat.mp3')

export function initAll() {
  playSomeNiceMusic()

  header.style.cssText = `
          margin-top: 5%;
          transition: .3s;
          font-size: 40px; 
          text-shadow: #FC0 0 30px 100px;
          `
  soundBtn.style.cssText = `
          transition: 1.2s;
          left: 94%
          `
  timer.style.cssText = `
          transition: 1.2s;
          left: 3%
          `
   
  let currentTime = 60
  timer.innerText = currentTime
  const timerStart = setInterval(() => {
    currentTime--
    if (!currentTime) currentTime = 60
    timer.innerText = currentTime
  }, 1000)

  setTimeout(() => {
    header.style.cssText = `
          margin-top: -100%;
          transition: 2s;
          font-size: 100px;
          text-shadow: #FC0 0 0 1px;
          `
    text.style.cssText = `
          transition: .5s;
          font-size: 0;
          width: 0;
          `
    soundBtn.style.cssText = `
          transition: .05s;
          left: 94%
          `
    timer.style.cssText = `
          transition: .1s;
          left: 3%
          `
  }, 300)
}

soundBtn.addEventListener('click', () => {
  soundBtnState = !soundBtnState
  audioWind.volume = soundBtnState ? volumeWind : 0
  audioBeat.volume = soundBtnState ? volumeBeat : 0
  soundBtn.style.backgroundImage = soundBtnState
    ? 'url("./assets/icons/sound-play.png")'
    : 'url("./assets/icons/sound-mute.png")'
})

export function playScream() {
  if (soundBtnState) {
    const scream = new Audio('./assets/sound/Wilhelm_scream.mp3')
    scream.volume = volumeScream
    scream.play()
  }
}

export function playSomeNiceMusic() {
  // audioWind.volume = volumeWind
  // audioWind.play()

  audioBeat.volume = volumeBeat
  audioBeat.play()
  audioBeat.addEventListener('pause', () => {
    this.currentTime = 0
    this.playSomeNiceMusic()
    playSomeNiceMusic()
  })
}

export function playWind() {
  audioWind.volume = volumeWind
  audioWind.play()
  audioWind.addEventListener('pause', () => {
    this.currentTime = 0
    this.playWind()
    playWind()
  })
}