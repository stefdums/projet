const Message = require('../models').Message
const User = require('../models').User
const Commentaire = require('../models').Commentaire
const jwt = require('jsonwebtoken')
const clean = require('xss-clean/lib/xss').clean
const fs = require('fs')

/***
 * POST un commentaire
 */
exports.createCommentaire = (req, res, next)=>{
    const cleanTexte = clean(req.body.texte)
    /***
     * recuperation de UserId et isAdmin
     */
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const UserId = decodedToken.UserId;

    Commentaire.create({      // pour créer un commentaire
        texte: cleanTexte,
        UserId: UserId,
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
    /***
     * recuperation de UserId et isAdmin
     */
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const UserId = decodedToken.UserId;
    const isAdmin = decodedToken.isAdmin;

    Commentaire.findOne({
        where: {
            id: req.params.id
        }
    })
    .then( Commentaire => {
        if( Commentaire.UserId == UserId || isAdmin == 1){

            const filename = Commentaire.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, ()=> {

                Commentaire.destroy({
                    where: { id: req.params.id }
                })
                .then(()=> Message.decrement( //pour décrementer nbCommentaires de 1
                    'nbCommentaires',
                { where: { id: req.params.id }}
                ))
                .then(() => res.status(200).json({ message: "commentaire supprimé" }))
                .catch(error => res.status(400).json({ error }))
            })
        }    
        else {
            throw "ACTION NON AUTORISEE"
        }
    })
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
    /***
     * recuperation de UserId et isAdmin
     */
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const UserId = decodedToken.UserId;
    const isAdmin = decodedToken.isAdmin;

    const cleanTexte = clean(req.body.texte)

    Commentaire.findOne({
        where: {
            id: req.params.id
        }
    })
    .then( Commentaire => {
        if ( Commentaire.UserId == UserId){
            Commentaire.update({
                texte: cleanTexte,
                image:  `${req.protocol}://${req.get('host')}/images/${req.body.filename}`
            },{
                where: {
                    id: req.params.id   
                }
            })
            .then(()=> res.status(200).json({ message: 'commentaire modifié' }))
            .catch( error => res.status(400).json({ error })) //syntaxe invalide 
        }
        else {
            throw 'ACTION NON AUTORISEE'
        }
    })
    .catch( error => res.status(500).json({ error })) //syntaxe invalide            

            

}