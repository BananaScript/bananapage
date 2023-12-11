export const rnd = (min = 255, max = 255) => Math.floor(Math.random() * (max - min + 1)) + min
export const selectRandom = (items) => items[rnd(0, items.length - 1)]
export const selectRandomKey = (items) => Object.keys(items)[rnd(0, Object.keys(items).length - 1)]

export const withUnit = (value, unit) => `${value}${unit}`
export const px = (value) => withUnit(value, 'px')
export const ms = (value) => withUnit(value, 'ms')
export const rgb = (r, g, b) => `rgb(${r}, ${g}, ${b})`

export function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }