'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const config = require('config')

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

app.post('/webhook/', function (req, res) {
  let messagingEvents = req.body.entry[0].messaging
  for (let i = 0; i < messagingEvents.length; i++) {
    let event = req.body.entry[0].messaging[i]
    let sender = event.sender.id
    if (event.message && event.message.text) {
      let text = event.message.text
      if (text.substring(0, 200).indexOf('หาแมว') !== -1) {
        sendGenericMessage(sender, 13.8469763, 100.5698991)
      } else {
        sendTextMessage(sender, 'Text received, echo: ' + text.substring(0, 200))
        sendTextMessage(sender, 'meow meow~*')
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

function sendGenericMessage (sender, latitude, longitude) {
  const zoom = 18
  let messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': [{
          'title': 'Location',
          'subtitle': 'Bangkhen',
          'image_url': `http://staticmap.openstreetmap.de/staticmap.php?center=${latitude},${longitude}&zoom=${zoom}&size=865x512&maptype=mapnik`,
          'buttons': [{
            'type': 'web_url',
            'url': `https://www.google.co.th/maps/@${latitude},${longitude},21z?hl=th`,
            'title': 'view full map'
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
