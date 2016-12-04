'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.use('/', routes)

export default app
