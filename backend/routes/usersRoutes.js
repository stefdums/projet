const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/usersCtrl');

const authConnexion = require('../middleware/authConnexion')
const authAdmin = require('../middleware/authAdmin')
const multer = require('../middleware/multer-config');


//route POST pour s'inscrire 
router.post('/inscription',  multer,usersCtrl.inscription);

//route GET pour ADMIN pour avoir tous les utilisateurs
router.get('/inscription', authAdmin, usersCtrl.getInscriptions)

//route GET pour avoir un utilisateur
router.get('/inscription/:id', authConnexion, multer, usersCtrl.getOneInscription)

// route PUT pour modifier l'utilisateur 
router.put('/inscription/:id', authConnexion,  multer, usersCtrl.modifyUser)

// route DELETE pour supprimer l'utilisateur
router.delete('/inscription/:id', authConnexion, usersCtrl.deleteInscription)

// route pour POST une connexion
router.post('/connexion', usersCtrl.connexion)

// route pour ADMIN seulement pour voir les messages d'un utilisateur
router.get('/inscription/:id/messages', authAdmin, usersCtrl.getMessagesByUserId)

module.exports = router;