const express = require('express');
const router = express.Router();

const messagesCtrl = require('../controllers/messagesCtrl')

//route POST
router.post('/', messagesCtrl.createMessage);
//PUT modifier un message
router.put('/:id', messagesCtrl.modifyMessage)
//route GET Tout les messages
router.get('/', messagesCtrl.getMessages)
//route GET un message
router.get('/:id', messagesCtrl.getMessageById)
//route DELETE supprimer un message
router.delete('/:id', messagesCtrl.deleteMessage)



module.exports = router;