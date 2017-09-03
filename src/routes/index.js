const express = require('express')
const router = express.Router()
// const postController = require('../controllers/postController');
// const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', function (req, res) {
  res.json({ message: 'Request received!' })
})

module.exports = router
