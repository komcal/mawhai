import { Router } from 'express'
import { sendTextMessage, sendGenericMessage, getData, changeMode, macaddress } from '../utils'

const router = Router()

let interval

router.post('/', function (req, res) {
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
          if (location.macaddress) {
            // sendGenericMessage(sender, location)
            location.macaddress.map((address) => {
              const text = `อยู่ในบริเวณ ${macaddress[address]}`
              sendTextMessage(sender, text)
            })
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
      } else if (text.substring(0, 200).indexOf('ขอบคุณ') !== -1) {
        sendTextMessage(sender, 'ขอบคุณคับบบ meow~*')
      } else if (text.substring(0, 200).indexOf('ไฟ') !== -1) {
        if (text.substring(0, 200).indexOf('เปิดไฟ') !== -1) {
          changeMode(1, false)
        } else if (text.substring(0, 200).indexOf('ปิดไฟ') !== -1) {
          changeMode(0, false)
        } else if (text.substring(0, 200).indexOf('ไฟออโต้') !== -1) {
          changeMode(2, false)
        }
        if (text.substring(0, 200).indexOf('ไฟไม่กระพริบ') !== -1) {
          changeMode(false, 0)
        } else if (text.substring(0, 200).indexOf('ไฟกระพริบ') !== -1) {
          changeMode(false, 1)
        }
        sendTextMessage(sender, 'OK ครับ')
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
