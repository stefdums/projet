const express = require('express');
const router = express.Router();

const authConnexion = require('../middleware/authConnexion')
const multer = require('../middleware/multer-config')

const messagesCtrl = require('../controllers/messagesCtrl')
const commentairesCtrl = require('../controllers/commentairesCtrl')



/**
 * Route pour message
 */
//route POST
router.post('/', authConnexion, multer, messagesCtrl.createMessage);

//PUT modifier un message
router.put('/:id',authConnexion, multer, messagesCtrl.modifyMessage)

//route GET Tous les messages
router.get('/', authConnexion, messagesCtrl.getMessages)

//route GET un message
router.get('/:id', authConnexion, messagesCtrl.getMessageById)

//route DELETE supprimer un message
router.delete('/:id', authConnexion, messagesCtrl.deleteMessage)

/**
 * Route pour commentaire
 */
//route POST un commentaire
router.post('/:id/comm',authConnexion, multer, commentairesCtrl.createCommentaire);

//route GET les commentaires d'un message
router.get('/:MessageId/comm' ,authConnexion, commentairesCtrl.getCommentaires)

//route GET pour UN commentaire
router.get('/:MessageId/comm/:id', authConnexion, commentairesCtrl.getCommentaireById)

//route DELETE un commentaire
router.delete('/:MessageId/comm/:id',authConnexion, commentairesCtrl.deleteCommentaire);

//route PUT son commentaire
router.put('/:MessageId/comm/:id',authConnexion, multer, commentairesCtrl.modifyCommentaire)



module.exports = router;