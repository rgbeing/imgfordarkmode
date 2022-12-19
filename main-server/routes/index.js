var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(301).redirect('https://www.naver.com');
});

module.exports = router;
