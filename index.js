'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const config = require('config')
const fs = require('fs')

// const hubVerifyToken = process.env.HUB_VERIFY_TOKEN || config.hubVerifyToken
const token = process.env.PAGE_ACCESS_TOKEN || config.pageToken

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

function sendTextMessage (sender, text) {
  let messageData = { text: text }

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    } else {
      console.log('success sending to', sender)
    }
  })
}

function sendGenericMessage (sender, location) {
  const zoom = 18
  const { lat, long } = location
  let messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': [{
          'title': 'Location',
          'subtitle': 'Bangkhen',
          'image_url': `http://staticmap.openstreetmap.de/staticmap.php?center=${lat},${long}&zoom=${zoom}&size=865x512&maptype=mapnik`,
          'buttons': [{
            'type': 'web_url',
            'url': `https://www.google.co.th/maps/@${lat},${long},21z?hl=th`,
            'title': 'view full map'
          }, {
            'type': 'postback',
            'title': 'หาเจอแล้ว',
            'payload': 'หาเจอแล้ว'
          }]
        }]
      }
    }
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

// spin spin sugar
const port = process.env.PORT || 5000
app.listen(port, function () {
  console.log('running on port', port)
})
