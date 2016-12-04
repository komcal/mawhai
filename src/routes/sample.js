import { Router } from 'express'
import { getData } from '../utils'

const router = Router()

router.get('/', (req, res) => {
  res.send('hello world i am mawhai bot')
})

router.get('/data', (req, res) => {
  const location = new Promise(getData)
  location.then((location) => {
    if (location.lat && location.long) {
      res.status(200).send(location)
    }
  })
  .catch((err) => {
    res.status(500).send(err || { message: 'Internal Error' })
  })
})

export default router
