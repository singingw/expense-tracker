const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  return res.render('new')
})
router.delete('/:records_id', (req, res) => {
  const _id = req.params.records_id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => next(error))
})
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
    next(new Error('some error'));
  }
})

module.exports = router