// require ('dotenv/config');
const mysql = require ('mysql');

const dbConfig = mysql.createConnection ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

dbConfig.connect (e => {
  if (e) throw e; //menampilkan kalimat error ke halaman web
});

module.exports = dbConfig;

