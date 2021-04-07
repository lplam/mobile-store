const router = require('express').Router()
const customer = require('./customer')
const admin = require('./admin')

router.use('/customer', customer)
router.use('/admin', admin)

module.exports = router
