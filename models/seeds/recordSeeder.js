if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const RecordList = require('./recordList.json')

db.once('open', () => {
  Promise.all(Array.from(RecordList, record => {
    User.findOne({ name: record.userName })
      .lean()
      .then(user => {
        Category.findOne({ name: record.categoryName })
          .lean()
          .then(category => {
            return Record.create({
              name: record.name,
              date: record.date,
              amount: record.amount,
              note: record.note,
              userId: user._id,
              categoryId: category._id
            })
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  }))
    .then(() => {
      console.log('recordSeeder.js is done')
      process.exit()
    })
})


