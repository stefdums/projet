const express = require('express');
const router = express.Router();

const authConnexion = require('../middleware/authConnexion')
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')


const messagesCtrl = require('../controllers/messagesCtrl')
const commentairesCtrl = require('../controllers/commentairesCtrl')


//route POST
router.post('/', multer,messagesCtrl.createMessage);
//PUT modifier un message
router.put('/:id',authConnexion,  multer, messagesCtrl.modifyMessage)
//route GET Tout les messages
router.get('/', authConnexion, messagesCtrl.getMessages)
//route GET un message
router.get('/:id', authConnexion, messagesCtrl.getMessageById)
//route DELETE supprimer un message
router.delete('/:id', authConnexion, messagesCtrl.deleteMessage)

//route POST un commentaire
router.post('/:id/comm',  multer,commentairesCtrl.createCommentaire);
//route GET les commentaires d'un message
router.get('/:MessageId/comm' ,authConnexion, commentairesCtrl.getCommentaires)
//route DELETE un commentaire
router.delete('/:MessageId/comm/:id',authConnexion,commentairesCtrl.deleteCommentaire);
//route PUT son commentaire
router.put('/:MessageId/comm/:id',authConnexion,  multer, commentairesCtrl.modifyCommentaire)

module.exports = router;