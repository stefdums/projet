const Message = require('../models').Message
const User = require('../models').User
const Commentaire = require('../models').Commentaire
const jwt = require('json-web-token');




/***
 * POST un commentaire
 */
exports.createCommentaire = (req, res, next)=>{

    Commentaire.create({      // pour créer un commentaire
        texte: req.body.texte,
        UserId: req.body.UserId,
        MessageId: req.params.id
    })
    .then(()=> Message.increment( //pour incrementer nbCommentaires de 1
         'nbCommentaires',
        { where: { id: req.params.id }}
    ))
    .then(()=> res.status(201).json({ message: "commentaire posté" }))
    .catch( error => res.status(400).json({ error }))
}

/**
 * DELETE un commentaire
 */
exports.deleteCommentaire = (req, res, next) =>{

    Commentaire.destroy({
        where: { id: req.params.id }
    })
    .then(()=> Message.decrement( //pour décrementer nbCommentaires de 1
        'nbCommentaires',
    { where: { id: req.params.id }}
    ))
    .then(() => res.status(200).json({ message: "commentaire supprimé" }))
    .catch(error => res.status(400).json({ error }))
      
}

/***
 * GET commentaires d'un message
 */
exports.getCommentaires = (req, res, next)=>{
    Commentaire.findAll({
        where: {
            MessageId: req.params.MessageId
        },
    })
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error })); //syntaxe invalide
}

/**
 * PUT son commentaire
 */
exports.modifyCommentaire = (req, res, next)=>{

    Commentaire.update({
        texte: req.body.texte
    },{
        where: {
            id: req.params.id   
        }
    })
    .then(()=> res.status(200).json({ message: 'commentaire modifié' }))
    .catch( error => res.status(400).json({ error })) //syntaxe invalide             

}