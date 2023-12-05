const musicList = [
    './assets/sound/01.Lanius.mp3',
    './assets/sound/02.SpaceCruise.mp3',
    './assets/sound/03.Cosmos.mp3',
    './assets/sound/04.ColonyShip.mp3',
    './assets/sound/05.Rockmen.mp3',
    './assets/sound/06.LastStand.mp3',
]

function playSomeNiceMusic (volume) { // playSomeNiceMusic() goes to index.js
    const audio = new Audio(selectRandom(musicList)); 
    audio.volume = volume;
    audio.play();
    audio.addEventListener('pause', () => {
        playSomeNiceMusic () 
    })
}

// randomizer
const rnd = (min = 255, max = 255) =>
  Math.floor(Math.random() * (max - min + 1)) + min
const selectRandom = (items) => items[rnd(0, items.length - 1)]
const selectRandomKey = (items) => Object.keys(items)[rnd(0, Object.keys(items).length - 1)]

