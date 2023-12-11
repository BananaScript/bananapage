function botAnswer(userMsg) {  // goes to index.js
  userMsg = userMsg.replace(/[\\1234567890\'!"#$%&()*+,\.\/:;<=>?@\[\]^_`{|}~]/g, ' ')
  userMsg = userMsg.replace(/\s+/g, ' ').trim()
  userMsg = userMsg.replace(/[ёЁ]/g, 'е')

  for (let key in answers) {
    if (key == userMsg.toLowerCase()) {
      return answers[key]
    }
  }
  return 'Не отнимай моё время своими глупыми писаками'
}
