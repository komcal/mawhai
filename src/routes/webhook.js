import { Router } from 'express'
import { sendTextMessage, sendGenericMessage, getData } from '../utils'

const router = Router()

let interval

router.post('/webhook/', function (req, res) {
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

export default router