const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
//新增
router.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(error => next(error))
})
router.post('/', async (req, res, next) => {
  try {
    //取出資料
    req.body.userId = req.user._id
    const { name, date, category, amount, note, userId } = req.body
    const categories = await Category.findOne({ name: category }).lean()
    const categoryId = categories._id
    //新增一筆支出
    Record.create({ name, date, amount, note, userId, categoryId })
    return res.redirect('/')
  } catch (error) {
    next(new Error('some error'))
  }
})
//刪除
router.delete('/:records_id', (req, res) => {
  const _id = req.params.records_id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => next(error))
})
//修改
router.get('/:records_id/edit', async (req, res, next) => {
  try {
    //取出欲修改資料
    const recordId = req.params.records_id
    const userId = req.user._id
    const record = await Record.findOne({ _id: recordId, userId }).lean()
    //類別
    const categories = await Category.find().lean()
    const categoryId = record.categoryId
    const categorySelect = categories.filter(category => category._id.equals(categoryId))[0].name
    //時間
    record.date = record.date.toJSON().toString().slice(0, 10)
    return res.render('edit', { record, categories, categorySelect })
  } catch (error) {
    next(new Error('some error'))
  }
})
router.put('/:records_id', async (req, res, next) => {
  try {
    //取出資料
    const _id = req.params.records_id
    req.body.userId = req.user._id
    const { name, date, category, amount, note, userId } = req.body
    const categories = await Category.findOne({ name: category }).lean()
    const categoryId = categories._id
    //更新
    Record.findOne({ _id, userId })
      .then(records => {
        records.name = name
        records.date = date
        records.amount = amount
        records.note = note
        records.userId = userId
        records.categoryId = categoryId
        return records.save()
      })
    return res.redirect('/')
  } catch (error) {
    next(new Error('some error'))
  }
})

module.exports = router