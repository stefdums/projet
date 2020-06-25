const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const messagesCtrl = require('../controllers/messagesCtrl')
const commentairesCtrl = require('../controllers/commentairesCtrl')

//route POST
router.post('/',auth, messagesCtrl.createMessage);
//PUT modifier un message
router.put('/:id',auth, messagesCtrl.modifyMessage)
//route GET Tout les messages
router.get('/', auth, messagesCtrl.getMessages)
//route GET un message
router.get('/:id', auth, messagesCtrl.getMessageById)
//route DELETE supprimer un message
router.delete('/:id', auth,messagesCtrl.deleteMessage)

//route POST un commentaire
router.post('/:id/comm', commentairesCtrl.createCommentaire);
//route GET les commentaires d'un message
router.get('/:MessageId/comm' ,auth,  commentairesCtrl.getCommentaires)
//route DELETE un commentaire
router.delete('/:MessageId/comm/:id',auth, commentairesCtrl.deleteCommentaire);
//route PUT son commentaire
router.put('/:MessageId/comm/:id',auth, commentairesCtrl.modifyCommentaire)

module.exports = router;