import { Router } from 'express'
import fs from 'fs'

const router = Router()

router.get('/', (req, res) => {
  fs.readFile('./data', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(err || { message: 'Internal Error' })
    } else {
      res.status(200).send(JSON.parse(data))
    }
  })
})

router.post('/', (req, res) => {
  const { lat, long } = req.body
  console.log(`body: ${req.body}`)
  console.log(`lat: ${lat}, long: ${long}`)
  const data = { lat, long }
  fs.writeFile('./data', JSON.stringify(data), (err) => {
    if (err) {
      res.status(500).send(err || { message: 'Internal Error' })
    } else {
      res.status(200).send({ message: 'Success' })
    }
  })
})

export default router
