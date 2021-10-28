const express = require('express');
const mysql = require('mysql2');
// const inputCheck = require('./utils/inputCheck');
const PORT = process.env.PORT || 3002;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Huskylock@21',
    database: 'business'
  },
  console.log('Connected to the business database.')
);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

//   query the database to test the connection reference 12.2.4
db.query(`SELECT * FROM employee`, (err, rows) => {
  console.log(rows);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });