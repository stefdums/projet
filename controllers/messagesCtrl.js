const Commentaire = require('../models').Commentaire
const Message = require('../models').Message
const User = require('../models').User
const jwt = require('jsonwebtoken')
const fs = require('fs')


const clean = require('xss-clean/lib/xss').clean
 
/**
 * POST
 */
exports.createMessage = (req, res, next)=>{
    /***
     * recuperation de UserId et isAdmin
     */
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const UserId = decodedToken.UserId;
    let cleanTitreImage = clean(req.body.titreImage);

    Message.create({ //  create méthode, qui combine les méthodes build et save
        
        titreImage: cleanTitreImage,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.body.filename}`, //req.file.filname a la place de body    
        UserId: UserId   
    })
    .then(console.log(UserId))
    .then(()=> res.status(201).json({ message: "message enregistré" }))
    .catch(error => res.status(400).json({ error }))
}
/**
 * PUT son message
 */
exports.modifyMessage = (req, res, next)=>{
    /***
     * recuperation de UserId et isAdmin
     */
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const UserId = decodedToken.UserId;
    const isAdmin = decodedToken.isAdmin;

    const cleanTitreImage = clean(req.body.titreImage)
    /**
     * recuperation du message à modifier
     */
    Message.findOne({
        where: {
            id: req.params.id
        }
    })
    .then( Message => {
        /**
         * Si UserId du message est le même que celui du token
         */
        if( Message.UserId == UserId ){ // || isAdmin == 1){    ----> Si l'entreprise souhaite modifier les messages
            Message.update({ 
                titreImage: cleanTitreImage,
                imageUrl: req.body.imageUrl,
                photoProfil: `${req.protocol}://${req.get('host')}/images/${req.body.filename}` //req.file.filname a la place de body    
                },{ 
                    where: {
                    id: req.params.id 
                }
            })
            .then(()=> res.status(200).json({ message: 'message modifié' }))
            .catch( error => res.status(400).json({ error })) //syntaxe invalide throw 'Pas acces'
        }
        else {
            throw "ACTION NON AUTORISEE" 
        }                    
    })
    .catch( error => res.status(500).json({ error })) //syntaxe invalide                
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
    /***
     * recuperation de UserId et isAdmin
     */
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const UserId = decodedToken.UserId;
    const isAdmin = decodedToken.isAdmin;
    /**
     * recuperation du message à supprimer
     */
    Message.findOne({
        where: {
            id: req.params.id
        }
    })
    .then( Message => {
        /**
         * Suppression du message autorisée seulement si Admin ou créateur du message
         */
        if( Message.UserId == UserId || isAdmin == 1){

            const filename = Message.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, ()=> {
                Message.destroy({
                    where: { id: req.params.id }
                })
                .then(() => res.status(200).json({ message: "message supprimé" }))
                .catch(error => res.status(400).json({ error }))
            })    
        }
        else {
            throw "ACTION NON AUTORISEE"
        }
    })
    .catch( error => res.status(500).json({ error })) //syntaxe invalide 
    
}