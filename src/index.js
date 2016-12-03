'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import { sendTextMessage, sendGenericMessage } from './facebook'
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', (req, res) => {
  res.send('hello world i am mawhai bot')
})

app.post('/location', (req, res) => {
  const { lat, long } = req.body
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

app.get('/location', (req, res) => {
  fs.readFile('./data', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(err || { message: 'Internal Error' })
    } else {
      res.status(200).send(JSON.parse(data))
    }
  })
})
app.get('/data', (req, res) => {
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

function getData (resolve, reject) {
  fs.readFile(`./data`, 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(JSON.parse(data))
    }
  })
}

let interval

app.post('/webhook/', function (req, res) {
  let messagingEvents = req.body.entry[0].messaging
  for (let i = 0; i < messagingEvents.length; i++) {
    let event = req.body.entry[0].messaging[i]
    let sender = event.sender.id
    if (event.message && event.message.text) {
      let text = event.message.text
      if (text.substring(0, 200).indexOf('หาแมว') !== -1) {
        const location = new Promise(getData)
        location.then((location) => {
          console.log('location: ', location)
          if (location.lat && location.long) {
            sendGenericMessage(sender, location)
          }
        })
      } else if (text.substring(0, 200).indexOf('หารัวๆ') !== -1) {
        interval = setInterval(() => {
          const location = new Promise(getData)
          location.then((location) => {
            console.log('location: ', location)
            if (location.lat && location.long) {
              sendGenericMessage(sender, location)
            }
          })
        }, 2000)
      } else if (text.substring(0, 200).indexOf('หยุดหา') !== -1) {
        clearInterval(interval)
      } else {
        sendTextMessage(sender, 'meow meow~*')
      }
    } else if (event.postback && event.postback.payload) {
      if (event.postback.payload.indexOf('หาเจอแล้ว') > -1) {
        sendTextMessage(sender, 'ขอบคุณที่ใช้บริการน้า meow~*')
      }
    }
  }
  res.sendStatus(200)
})

// spin spin sugar
const port = process.env.PORT || 5000
app.listen(port, function () {
  console.log('running on port', port)
})
