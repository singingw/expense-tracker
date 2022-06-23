const express = require('express')
const dayjs = require('dayjs')
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
      record.date = dayjs(record.date).format("YYYY/MM/DD");
    })
    return res.render('index', {
      records: records,
      categories: categories,
      totalAmount
    })
  } catch (error) {
    next(error)
  }
})
router.post('/', async (req, res, next) => {
  try {
    //找出使用者資料
    const userId = req.user._id
    const records = await Record.find({ userId }).lean()
    //首頁顯示資料
    const categories = await Category.find().lean()
    const { categorySelect } = req.body
    let filterRecord = records
    let totalAmount = 0
    //篩選類別
    const categoryId = categories.filter(category => category.name === categorySelect)[0]._id
    filterRecord = records.filter(record => record.categoryId.equals(categoryId))

    filterRecord.forEach(record => {
      record.icon = categories.filter(category => categoryId.equals(category._id))[0].icon
      //取出時間
      record.date = dayjs(record.date).format("YYYY/MM/DD");
      totalAmount += record.amount
    })
    return res.render('index', {
      records: filterRecord,
      categories: categories,
      totalAmount,
      categorySelect
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
