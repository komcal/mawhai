import { Router } from 'express'
import fs from 'fs'

const router = Router()

router.get('/', (req, res) => {
  fs.readFile('./mode.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(err || { message: 'Internal Error' })
    } else {
      res.status(200).send(JSON.parse(data))
    }
  })
})

export default router
