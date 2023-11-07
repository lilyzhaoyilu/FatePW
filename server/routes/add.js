var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const DBPATH = '/home/lily/code/FatePW/db/fate.db';

router.post('/category', async (req, res, next) => {

  // console.log('dirname:', __dirname);

  const db = await new sqlite3.Database(DBPATH);
  // console.log(req.body);
  // await db.all(`SELECT * FROM categories;`, (err, rows) => {
  //   if (err) {
  //     console.error(err);
  //   }
  //   rows.forEach(r => { console.log('existed:', r) });
  // })
  const INSERT_CATEGORY = `INSERT INTO categories (category, kook_role_id) VALUES ("${req.body.category}", ${req.body.kookRoleId})`;
  await db.run(INSERT_CATEGORY, err => {
    if (err) {
      console.error(`Error inserting add/category with category: ${req.body.category} and kook_role_id: ${req.body.kookRoleId}`);
      res.sendStatus(400);
    }
  })
  await db.close(err => {
    if (err) {
      console.error(err.message);
      res.sendStatus(500);
    }
  });
  res.sendStatus(200);
})

router.post('/pw', async (req, res, next) => {
  console.log('reaching /pw');
  const db = await new sqlite3.Database(DBPATH);
  const INSERT_CATEGORY = `INSERT INTO peiwan (display_id, kook_id, name, introduction) VALUES (${req.body.displayId}, ${req.body.kookId}, "${req.body.name}", "${req.body.introduction}")`;

  await db.run(INSERT_CATEGORY, err => {
    if (err) {
      console.error(`Error inserting add/pw with displayId: ${req.body.displayId}; kook_id: ${req.body.kookId}; name:${req.body.name}; introduction:${req.body.introduction}`);
      res.sendStatus(400);
    }
  })
  await db.close(err => {
    if (err) {
      console.error(err.message);
      res.sendStatus(500);
    }
  });
  res.sendStatus(200);
})

module.exports = router;