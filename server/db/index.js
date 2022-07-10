const mongoose = require('mongoose');

const NinthSchema = mongoose.Schema({
  ninth1: Number,
  ninth2: Number,
  ninth3: Number,
  ninth4: Number,
  ninth5: Number,
  ninth6: Number,
  ninth7: Number,
  ninth8: Number,
  ninth9: Number
});

const Ninth = mongoose.model("ninth", NinthSchema);

module.exports = { mongoose, Ninth};


/* 
const mysql2 = require('mysql2');
const Promise = require('bluebird');
require('dotenv').config();

const connection = mysql2.createConnection({
  user: process.env.USER_NAME || 'root',
  host: process.env.USER_HOST || 'localhost',
  database: process.env.USER_DATABASE || '',
  password: process.env.USER_PASSWORD || '',
});
module.exports = connection;
 */
