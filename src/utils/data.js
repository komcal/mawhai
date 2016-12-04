import fs from 'fs'

export const getData = (resolve, reject) => {
  fs.readFile(`./data`, 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(JSON.parse(data))
    }
  })
}
