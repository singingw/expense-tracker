const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res, next) => {
  try {
    //找出使用者資料
    const userId = req.user._id
    const records = await Record.find({ userId }).lean()
    //首頁顯示資料
    const categories = await Category.find().lean()
    let totalAmount = 0
    records.forEach(record => {
      //總金額
      totalAmount += record.amount
      //連接 categoryId
      const categoryId = record.categoryId
      record.icon = categories.filter(category => categoryId.equals(category._id))[0].icon
      //取出時間
      let createYear = record.date.getYear() + 1900
      createYear = createYear.toString()
      let createMonth = record.date.getMonth() + 1
      createMonth = createMonth.toString()
      let createDate = record.date.getDate().toString()
      record.date = createYear + "/" + createMonth + "/" + createDate
    })
    return res.render('index', {
      records: records,
      categories: categories,
      totalAmount,
    })
  } catch (error) {
    next(new Error('some error'));
  }
})

module.exports = router
