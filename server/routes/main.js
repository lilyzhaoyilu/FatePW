var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', async (req, res, next) => {
  res.json("主页在建设中");
});

module.exports = router;
