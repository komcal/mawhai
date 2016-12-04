'use strict'

import express from 'express'
import bodyParser from 'body-parser'
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// spin spin sugar
const port = process.env.PORT || 5000
app.listen(port, function () {
  console.log('running on port', port)
})
