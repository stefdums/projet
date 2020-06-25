const Commentaire = require('../models').Commentaire
const Message = require('../models').Message
const User = require('../models').User

var clean = require('xss-clean/lib/xss').clean

//let cleanTitreImage = clean(req.body.titreImage);

/**
 * POST
 */
exports.createMessage = (req, res, next)=>{

    Message.create({ //  create méthode, qui combine les méthodes build et save
        titreImage: req.body.titreImage,
        imageUrl: req.body.imageUrl,
        UserId: req.body.UserId,
         
    })
    .then(()=> res.status(201).json({ message: "message enregistré" }))
    .catch(error => res.status(400).json({ error }))
}
/**
 * PUT son message
 */
exports.modifyMessage = (req, res, next)=>{

        Message.update({ 
            titreImage: req.body.titreImage,
            imageUrl: req.body.imageUrl,
         },{ 
             where: {
                id: req.params.id 
            }
        })
        .then(()=> res.status(200).json({ message: 'message modifié' }))
        .catch( error => res.status(400).json({ error })) //syntaxe invalide             
    }
/**
 * GET tout les messages
 */
exports.getMessages = (req, res, next)=>{

    Message.findAll({

        include: [{
            model: User,
            attributes: [ 'nom', 'prenom' ]

        }]
        
    })
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error })); //syntaxe invalide
}

/**
 * GET un message
 */
exports.getMessageById = (req, res, next)=>{

    Message.findOne({ 
        where: { id: req.params.id }
    })
    .then(message => res.status(200).json(message))
    .catch(error => res.status(404).json({ error }))
}

/***
 * DELETE un message
 */
exports.deleteMessage = (req, res, next)=>{
    Message.destroy({
        where: { id: req.params.id }
    })
    .then(() => res.status(200).json({ message: "message supprimé" }))
    .catch(error => res.status(400).json({ error }))
}