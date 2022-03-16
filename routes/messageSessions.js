const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/insertItem.js');
const data = require('../HelperFunctions/getUserEmail.js');

const { Pool } = require("pg");
const { string } = require('i/lib/util');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

module.exports = (db) => {
  router.get("/items/messageSessions", (req, res) => {

  });
};
