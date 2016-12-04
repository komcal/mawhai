import { Router } from 'express'
import sample from './sample'
import location from './location'
import webhook from './webhook'

const router = Router()

router.use('/sample', sample)
router.use('/location', location)
router.use('/webhook', webhook)

export default router
