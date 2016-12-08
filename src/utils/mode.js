import fs from 'fs'

export const changeMode = (nextState, nextBlink) => {
  fs.readFile('./mode.txt', 'utf8', (err, data) => {
    if (err) {
      console.log('cannot read mode.txt')
    } else {
      let { state, blink } = JSON.parse(data.mode)
      state = nextState !== false ? nextState : state
      blink = nextBlink !== false ? nextBlink : blink
      let mode = {'state': state, 'blink': blink}
      fs.writeFile('./mode.txt', JSON.stringify(mode), (err) => {
        if (err) {
          console.log('Error')
        } else {
          console.log('Success')
        }
      })
    }
  })
}
