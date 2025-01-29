const express = require('express');
const Tme = require('./runner');

const port = 1007;
const app = express();

app.get("/heavy", (req, res) => {
    let total = 0;
    for (let i = 0; i < 6_000_000; i++) {
      total++;
    }
    res.send(`The result of the CPU intensive task is ${total}\n`);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

console.log(`worker pid=${process.pid}`);