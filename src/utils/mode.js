import fs from 'fs'

export const changeMode = (mode) => {
  fs.writeFile('./mode.txt', { 'mode': mode }, (err) => {
    if (err) {
      console.log('Error')
    } else {
      console.log('Success')
    }
  })
}
