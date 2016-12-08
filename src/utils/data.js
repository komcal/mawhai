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
  'EC:BD:1D:07:99:70': 'ชั้น 3 ฝั่งขวา ตัวที่ 1',
  '5C:83:8F:D8:96:20': 'ชั้น 3 ฝั่งขวา ตัวที่ 2',
  '5C:83:8F:D8:8E:30': 'ชั้น 4 ฝั่งขวา ตัวที่ 1',
  '5C:83:8F:CF:06:C0': 'ชั้น 4 ฝั่งขวา ตัวที่ 2',
  '5C:83:8F:F2:ED:20': 'ชั้น 5 ฝั่งขวา',
  'EC:BD:1D:07:94:B0': 'ชั้น 6 ฝั่งซ้าย',
  '18:8B:9D:62:BA:00': 'ชั้น 7 ฝั่งขวา',
  '5C:83:8F:F7:11:F0': 'ชั้น 8 ฝั่งขวา',
  '20:3A:07:84:11:C0': 'ห้องชมรม',
  '00:26:CB:1C:05:A0': 'cafe dot com',
  'testnaja': 'บนหัวพ่อง'
}
