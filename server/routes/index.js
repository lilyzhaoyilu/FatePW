var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const DBPATH = '/home/lily/code/FatePW/db/fate.db';

/* GET home page. */
router.get('/category', async (req, res, next) => {
  const db = await new sqlite3.Database(DBPATH);
  await db.all(`SELECT * FROM categories;`, (err, rows) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
    res.json({ data: rows });
  })
  // await db.all(`SELECT * FROM peiwan;`, (err, rows) => {
  //   if (err) {
  //     console.error(err);
  //     res.sendStatus(500);
  //   }
  //   console.log('30');
  //   rows.forEach(r => { data.peiwan.push(r) });
  // })

  await db.close();

  // await console.log('end log: ', JSON.stringify(data));
  // await res.status(200).json(data);
});


router.get('/peiwan', async (req, res, next) => {
  const db = await new sqlite3.Database(DBPATH);
  await db.all(`SELECT * FROM peiwan;`, (err, rows) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
    console.log("corgi idnexjs: ", rows);
    res.json({ data: rows });
  })
});

const app = express();

app.on('close', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    } else {
      console.log('Database connection closed');
    }
  });
});


module.exports = router;
