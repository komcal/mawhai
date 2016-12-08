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
  const { macaddress } = req.body
  console.log(`mac address: ${macaddress}`)
  const arr = macaddress.split(',')
  const data = { macaddress: arr }
  fs.writeFile('./data', JSON.stringify(data), (err) => {
    if (err) {
      res.status(500).send(err || { message: 'Internal Error' })
    } else {
      res.status(200).send({ message: 'Success' })
    }
  })
})

export default router
