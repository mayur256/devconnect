const express = require('express')

const router = express.Router()

//Test route
router.get('/test', (req, res) => res.json({msg:"This is a test profile route"}))

module.exports = router