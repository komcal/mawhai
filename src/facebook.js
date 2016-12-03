import request from 'request'
import config from 'config'

// const hubVerifyToken = process.env.HUB_VERIFY_TOKEN || config.hubVerifyToken
const token = process.env.PAGE_ACCESS_TOKEN || config.pageToken

export const sendTextMessage = (sender, text) => {
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

export const sendGenericMessage = (sender, location) => {
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
            'url': `http://maps.google.com/maps?q=loc:${lat},${long}`,
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
