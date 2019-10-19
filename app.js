const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const uuid = require('uuid/v4');

//for variabble app you can change name to anything
//using dependencies express
const app = express();

const port = process.env.PORT || 3000;
//connect to mysql

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'arkademySocialMedia'
});

conn.connect(err => {
  if (err) console.log(`error ${err} `);
  console.log('database connnected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // this to usex-www-forme in postman

// app.get('/', function(req,res) {

// }); //

//this is routing
//get all name
app.get('/', (req, res) => {
  const searchKey = req.query.searchKey;
  conn.query('SELECT * from users', (err, result) => {
    if (err) {
      res.json({
        status: 400,
        error: true,
        message: err
      });
    } else {
      res.json({
        status: 200,
        search: searchKey,
        message: 'halo world',
        data: result,
        error: false
      });
    }
  });

  //   res.json({
  //     status: 200,
  //     search: searchKey,
  //     message: 'halo world',
  //     data: [
  //       {
  //         id: 1,
  //         name: 'bima',
  //         address: 'solo'
  //       },
  //       {
  //         id: 2,
  //         name: 'mahe',
  //         address: 'solo'
  //       },
  //       {
  //         id: 3,
  //         name: 'putra',
  //         address: 'jogja'
  //       }
  //     ],
  //     error: false
  //   });
});

//get single name
app.get('/name/:id', (req, res) => {
  const id = req.params.id;

  // destruction with es6
  //   const { id } = req.params;
  conn.query(`SELECT * FROM users WHERE id ='${id}' `, (err, result) => {
    if (err) {
      res.json({
        status: 400,
        error: true,
        message: err
      });
    } else {
      res.status(200).json({
        status: 200,
        message: 'success getting name ' + id,
        data: result
      });
    }
  });
  //   res.json({
  //     status: 200,
  //     message: 'success getting name ' + id,
  //     data: [
  //       {
  //         id: id,
  //         name: 'bima',
  //         address: 'solo'
  //       }
  //     ],
  //     error: false
  //   });
});

app.post('/name', (req, res) => {
  const { name, address } = req.body;
  const id = uuid();
  const data = { id, name, address };

  conn.query('INSERT INTO users SET ?', data, (err, result) => {
    if (err) {
      res.json({
        status: 400,
        error: true,
        message: err
      });
    } else {
      res.json({
        status: 201,
        data: data,
        message: 'success insert new data',
        error: false
      });
    }
  });
});

app.patch('/name/:id', (req, res) => {
  const id = req.params.id;
  const { name, address } = req.body;
  const data = { name, address };
  conn.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, result) => {
    if (err) {
      res.json({
        status: 400,
        error: true,
        message: err
      });
    } else {
      res.json({
        status: 201,
        data: data,
        message: 'success updating data',
        error: false
      });
    }
  });
});
app.delete('/name/:id', (req, res) => {
  const id = req.params.id;

  conn.query('DELETE FROM users WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(404).json({
        status: 404,
        error: true,
        message: err
      });
    } else {
      res.status(200).json({
        status: 201,
        message: 'success delete data' + id,
        error: false
      });
    }
  });
});

//pastikan taruh paling bbawah
app.get('*', (req, res) => {
  res.send('ra ono web e coeg');
});

app.listen(port, () => {
  console.log(`server is runinng on port : ${port}`);
});
