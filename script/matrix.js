const canvas = document.getElementById('matrix')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const context = canvas.getContext('2d')
const charSize = 12
const spacing = charSize + 6
let cols = Math.floor(window.innerWidth / spacing) + 1
let yPosition = Array(cols).fill(0)

// array of single characters (russian and chineese of course, because MATRIX =))) )
let characters =
  'йцукенгшщзхъфывапролджэячсмитьбюЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ' +
  '123456789123456789123456789' +
  '@#$%^&*()*&^%+-/~' +
  '吗在姐请你问下左点回右妈午来我四妈哥有出我了去事明爸上天午还没他哪您位是么时什给打请点电多的少你号话'
characters = characters.split('')

context.fillStyle = '#040'
context.fillRect(0, 0, canvas.width, canvas.height)

function matrix() {
  const w = window.innerWidth
  const h = window.innerHeight

  if (canvas.width !== w) {
    canvas.width = w
    cols = Math.floor(window.innerWidth / spacing) + 1
    yPosition = Array(cols).fill(0)
  }
  if (canvas.height !== h) {
    canvas.height = h
  }

  context.fillStyle = '#0001'
  context.fillRect(0, 0, w, h)

  context.fillStyle = '#0f0'
  context.font = charSize + 'pt monospace'

  yPosition.forEach((y, ind) => {
    const text = selectRandom(characters) // selectRandom() from utils.js
    const x = ind * spacing
    context.fillText(text, x, y)
    if (y > 100 + Math.random() * 10000) yPosition[ind] = 0
    else yPosition[ind] = y + spacing
  })
}

setInterval(matrix, 50)
