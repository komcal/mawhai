import { Router } from 'express'
import fs from 'fs'

const router = Router()

router.get('/', (req, res) => {
  fs.readFile('./mode.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(err || { message: 'Internal Error' })
    } else {
      let {state, blink} = JSON.parse(data)
      console.log("state " + state + " blink " + blink)
      // res.status(200).send(state + blink)
    }
  })
})

export default router
