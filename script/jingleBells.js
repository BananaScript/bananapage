import { ms, px, rgb, rnd, selectRandom } from './utils.js'
import { setups } from './config.js'

let start = new Date().getTime()
let count = 0

// перенести бы в утилс тоже, но совсем грубо получится
const randomColor = (
  r = setups.colors[0],
  g = setups.colors[1],
  b = setups.colors[2]
) => rgb(rnd(r), rnd(g), rnd(b))

const originPosition = { x: 0, y: 0 }

const lastState = {
  snowflakeTimestamp: start,
  snowflakePosition: originPosition,
  mousePosition: originPosition,
}

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
    diffY = b.y - a.y
  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
}

const calcElapsedTime = (start, end) => end - start

const appendElement = (element) => document.body.append(element)
const removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay)

const updateLastFlake = (position) => {
  lastState.snowflakeTimestamp = new Date().getTime()
  lastState.snowflakePosition = position
}

const updateLastMousePosition = (position) => (lastState.mousePosition = position)

window.onmousemove = (e) => {
  const mousePosition = { x: e.clientX, y: e.clientY
}

  const now = new Date().getTime(),
        hasMovedFarEnough = calcDistance(lastState.snowflakePosition, mousePosition) >= setups.minimumDistanceBetweenFlakes,
        hasBeenLongEnough = calcElapsedTime(lastState.snowflakePosition, now) > setups.minimumTimeBetweenFlakes

  if (hasMovedFarEnough || hasBeenLongEnough) {
    createSnowflake(mousePosition)
    updateLastFlake(mousePosition)
  }
  updateLastMousePosition(mousePosition)
}

// наконец, тут все снежинки
function createSnowflake(position) {
  const snowflake = document.createElement('span')
  snowflake.className = 'snowflake'
  snowflake.innerText = selectRandom(setups.snowflakes)
  snowflake.style.color = randomColor()
  snowflake.style.animationName = setups.animations[count++ % 3]
  snowflake.style.animationDuration = ms(setups.animationDuration)
  snowflake.style.left = px(position.x)
  snowflake.style.top = px(position.y)
  appendElement(snowflake)
  removeElement(snowflake, setups.animationDuration)
}
