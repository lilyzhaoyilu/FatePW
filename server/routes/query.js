var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const DBPATH = '/home/lily/code/FatePW/db/fate.db';

router.get('/', async (req, res, next) => {
  res.json("这页在建设中");
});

router.get('/labels', async (req, res, next) => {
  console.log("process env: ", process.env.DBPATH);
  const db = await new sqlite3.Database(DBPATH);
  await db.all(`SELECT * FROM labels;`, (err, rows) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
    res.json({ data: rows });
  })
  await db.close();
});


// router.get('/peiwan', async (req, res, next) => {
//   const db = await new sqlite3.Database(DBPATH);
//   await db.all(`SELECT * FROM peiwan;`, (err, rows) => {
//     if (err) {
//       console.error(err);
//       return res.sendStatus(500);
//     }
//     res.json({ data: rows });
//   })
// });


router.get('/peiwan', async (req, res, next) => {
  console.log("process env: ", process.env.DBPATH);
  const db = await new sqlite3.Database(DBPATH);

  try {
    const peiwanQuery = 'SELECT * FROM peiwan';
    const peiwanToGameAndPrice = 'SELECT * FROM games_and_price';

    const [peiwanRows, peiwanToGameAndPriceRows] = await Promise.all([
      executeQuery(db, peiwanQuery),
      executeQuery(db, peiwanToGameAndPrice),
    ]);

    const resPeiwanRows = JSON.parse(JSON.stringify(peiwanRows));

    for (const pw of resPeiwanRows) {
      pw.games = [];
      for (const game_row of peiwanToGameAndPriceRows) {
        console.log("game row: ", game_row);
        console.log("comp: ", game_row.kook_id, pw.kook_id, game_row.kook_id == pw.kook_id);
        if (game_row.kook_id == pw.kook_id) {
          pw.games.push(game_row);
        }
      }

    }

    // console.log("peiwan query row", peiwanRows);
    // console.log("peiwan games: ", peiwanToGameAndPriceRows);
    // console.log("peiwan query final", resPeiwanRows);

    res.json({ data: resPeiwanRows });
  } catch (error) {
    console.error('Error in try-catch block:', error.message);
    res.sendStatus(500);
  } finally {
    // Close the database connection
    await closeDatabase(db);
  }
});

// Helper function to execute a query and return a promise
function executeQuery(db, query) {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Helper function to close the database connection and return a promise
function closeDatabase(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


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
