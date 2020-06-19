const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/usersCtrl');

//route POST pour inscription
router.post('/', usersCtrl.inscription);
router.post('/', usersCtrl.connexion)


module.exports = router;