const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const record = require('./modules/record')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

router.use('/records', authenticator, record)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router