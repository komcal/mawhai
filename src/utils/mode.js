import fs from 'fs'

export const changeMode = (mode) => {
  console.log(mode)
  fs.writeFile('./mode.txt', JSON.stringify({ 'mode': mode }), (err) => {
    if (err) {
      console.log('Error')
    } else {
      console.log('Success')
    }
  })
}
