import { Router } from 'express'
import sample from './sample'
import location from './location'
import webhook from './webhook'
import mode from './mode'

const router = Router()

router.use('/', sample)
router.use('/location', location)
router.use('/webhook', webhook)
router.use('/mode', mode)

export default router
