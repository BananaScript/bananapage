const about = document.getElementById('about-content')
const chatbotSlide = document.getElementById('chatbot-slide')
const input = document.getElementById('input')
const chatField = document.getElementById('chatfield')

function beginChatting() {
  chatbotSlide.checked = true
  setTimeout(() => input.focus(), 500)
}

// next three listners - for better usability - put focus to input fild when random click occured
about.addEventListener('click', () => {
  beginChatting()
})

chatbotSlide.addEventListener('click', () => {
  beginChatting()
})

chatField.addEventListener('click', () => {
  beginChatting()
})

input.addEventListener(
  'focus',
  () => {
       playSomeNiceMusic(.4)  // from music.js
  },
  { once: true }
)

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (!input.value.trim()) input.value = input.placeholder
    createMsg('user', input.value, 0)
    // imitate live-a-like bot with random timeout of answers
    createMsg('bot', botAnswer(input.value), rnd(200,1500)) // from botLogic.js and utils.js
    input.value = ''
    const nextInput = selectRandomKey(answers) + '?'
    input.placeholder = nextInput
  }
})

function createMsg(person, msg, delay) {
  const personMsg = document.createElement('div')
  personMsg.classList.add(person, 'msg')
  chatField.append(personMsg)
  // scroll to actual position of messages
  chatField.scrollTop = chatField.scrollHeight

  // программа мамксимум - сделать анимацию , типа пишет
  if (delay) personMsg.innerText = ' . . . \n\n'
  setTimeout(() => {
      personMsg.innerText = msg
      chatField.scrollTop = chatField.scrollHeight
    }, delay)    
}
