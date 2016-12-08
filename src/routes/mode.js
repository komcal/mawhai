import { Router } from 'express'
import fs from 'fs'

const router = Router()

router.get('/', (req, res) => {
  fs.readFile('./mode.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(err || { message: 'Internal Error' })
    } else {
      let {state, blink} = JSON.parse(data)
      let mode = state + blink * 3
      res.status(200).send(JSON.stringify(mode))
    }
  })
})

export default router
