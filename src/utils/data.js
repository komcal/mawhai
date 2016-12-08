import fs from 'fs'

export const getData = (resolve, reject) => {
  fs.readFile(`./data`, 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(JSON.parse(data))
    }
  })
}

export const macaddress = {
  'ec:bd:1d:07:99:70': 'ชั้น 3 ฝั่งขวา ตัวที่ 1',
  '5c:83:8f:d8:96:20': 'ชั้น 3 ฝั่งขวา ตัวที่ 2',
  '5c:83:8f:d8:8e:30': 'ชั้น 4 ฝั่งขวา ตัวที่ 1',
  '5c:83:8f:cf:06:c0': 'ชั้น 4 ฝั่งขวา ตัวที่ 2',
  '5c:83:8f:f2:ed:20': 'ชั้น 5 ฝั่งขวา',
  'ec:bd:1d:07:94:b0': 'ชั้น 6 ฝั่งซ้าย',
  '18:8b:9d:62:ba:00': 'ชั้น 7 ฝั่งขวา',
  '5c:83:8f:f7:11:f0': 'ชั้น 8 ฝั่งขวา',
  '20:3a:07:84:11:c0': 'ห้องชมรม',
  '00:26:cb:1c:05:a0': 'cafe dot com',
  'testnaja': 'บนหัวพ่อง'
}
