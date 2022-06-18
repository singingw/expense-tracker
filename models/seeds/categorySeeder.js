const db = require('../../config/mongoose')
const Category = require('../category')

const CATEGORY = [
  {
    name: '家居物業',
    icon: 'fa-solid fa-house'
  },
  {
    name: '交通出行',
    icon: 'fa-solid fa-van-shuttle'
  },
  {
    name: '休閒娛樂',
    icon: 'fa-solid fa-face-grin-beam'
  },
  {
    name: '餐飲食品',
    icon: 'fa-solid fa-utensils'
  },
  {
    name: '其他',
    icon: 'fa-solid fa-pen'
  },
]

db.once('open', () => {
  Promise.all(Array.from(CATEGORY, SEED => Category.create(SEED)))
    .then(() => {
      console.log('categorySeeder.js is done')
      process.exit()
    })
})