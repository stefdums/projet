const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/usersCtrl');

const authAdmin = require('../middleware/authAdmin')
const authConnexion = require('../middleware/authConnexion')
const multer = require('../middleware/multer-config');


//route POST pour inscription
router.post('/inscription',  multer,usersCtrl.inscription);

router.get('/inscription', authConnexion, usersCtrl.getInscriptions)

router.get('/inscription/:id', authConnexion, multer, usersCtrl.getOneInscription)

router.put('/inscription/:id', authConnexion,  multer, usersCtrl.modifyUser)

router.delete('/inscription/:id', authConnexion, usersCtrl.deleteInscription)

router.post('/connexion', usersCtrl.connexion)

router.get('/inscription/:id/messages', usersCtrl.getMessagesByUserId)




module.exports = router;