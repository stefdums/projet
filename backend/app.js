const express = require('express');
const app = express('./app');
const bodyParser = require('body-parser')
const path = require('path');
require('dotenv').config();

const messagesRoutes = require('./routes/messagesRoutes')
const usersRoutes = require('./routes/usersRoutes')
//const commentairesRoutes = require('./routes/commentairesRoutes')
/**
 * DB connection
 */
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASS, {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
global.sequelize = sequelize;



/***
 * CORS
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
/***
 * Body-parser
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname,'images'))),

app.use('/groupomania/messages', messagesRoutes)
app.use('/groupomania/auth', usersRoutes)
//app.use('/groupomania/messages/:MessageId/comm', commentairesRoutes)


module.exports = app;