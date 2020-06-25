const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/usersCtrl');

//route POST pour inscription
router.post('/inscription', usersCtrl.inscription);
router.post('/connexion', usersCtrl.connexion)


module.exports = router;