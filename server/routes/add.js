var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const DBPATH = '/home/lily/code/FatePW/db/fate.db';

router.post('/labels', async (req, res, next) => {
  const db = await new sqlite3.Database(DBPATH);

  try {
    const INSERT_LABEL = `INSERT INTO labels (label, kook_role_id) VALUES ("${req.body.label}", ${req.body.kookRoleId})`;
    await db.run(INSERT_LABEL, async (err) => {
      if (err) {
        console.error(`Error inserting add/label`);
        res.status(400).json({ error: err.message });
      } else {
        await db.close((closeErr) => {
          if (closeErr) {
            console.error('Error closing database:', closeErr.message);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
      }
    })
  } catch (error) {
    console.error('Error in try-catch block:', error.message);
    res.sendStatus(500);
  }

})

router.post('/peiwan', async (req, res, next) => {
  const db = new sqlite3.Database(DBPATH);

  try {
    const kookId = req.body.kookId;
    const displayId = req.body.displayId;
    const name = req.body.name;
    const introduction = req.body.introduction;
    const location = req.body.location;
    const contactInfo = req.body.contactInfo;
    const pictureUrl = req.body.pictureUrl;
    const timbre = req.body.timbre;
    const label = req.body.label;

    const INSERT_PEIWAN = `
      INSERT INTO peiwan (kook_id, display_id, name, introduction, location, contact_info, picture_url, timbre, label)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.run(
      INSERT_PEIWAN,
      [kookId, displayId, name, introduction, location, contactInfo, pictureUrl, timbre, label],
      async (err) => {
        if (err) {
          console.error('Error inserting peiwan:', err.message);
          return res.status(400).json({ error: err.message });
        }

        await db.close((closeErr) => {
          if (closeErr) {
            console.error('Error closing database:', closeErr.message);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });

      }
    );
  } catch (error) {
    console.error('Error in try-catch block:', error.message);
    res.sendStatus(500);
  }
});

router.post('/games_and_price', async (req, res, next) => {


  const db = await new sqlite3.Database(DBPATH);
  const game = req.body.game;
  const price = req.body.price;
  const main_game = req.body.is_main_game;
  const kook_id = req.body.kook_id;

  try {
    const INSERT_LABEL = `INSERT INTO games_and_price (game, price, main_game, kook_id) VALUES (?, ?, ?, ?)`;
    await db.run(INSERT_LABEL, [game, price, main_game, kook_id], async (err) => {
      if (err) {
        console.error(`Error inserting games_and_price`);
        res.status(400).json({ error: err.message });
      } else {
        await db.close((closeErr) => {
          if (closeErr) {
            console.error('Error closing database:', closeErr.message);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
      }
    })
  } catch (error) {
    console.error('Error in try-catch block:', error.message);
    res.sendStatus(500);
  }

})

module.exports = router;