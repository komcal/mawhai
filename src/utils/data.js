import fs from 'fs'

export const getData = (resolve, reject) => {
  fs.readFile(`./data`, 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      let {state, blink} = JSON.parse(data)
      resolve(state + blink * 3)
    }
  })
}
