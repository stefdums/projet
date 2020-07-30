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
    const cleanImageComm = clean(req.body.image)
    /***
     * recuperation de UserId et isAdmin
     */
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const UserId = decodedToken.UserId;

    if(req.file != undefined){
        Commentaire.create({      // pour créer un commentaire
            texte: cleanTexte,
            imageComm: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, 
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
    else{
        Commentaire.create({      // pour créer un commentaire
            texte: cleanTexte,
            imageComm: cleanImageComm, 
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

    console.log()

    Commentaire.findOne({
        where: {
            id: req.params.id
        }
    })
    .then( Commentaire => {
        /**
         * Suppression du commentaire autorisée seulement si Admin ou créateur du message
         */        
        if( Commentaire.UserId == UserId || isAdmin == 1){
// verif si le commentaire contient une image:
            if ( Commentaire.imageComm == undefined){
                console.log('test1')
                const filename = Commentaire.imageComm.split('/images/')[1];
                fs.unlink(`images/${filename}`, ()=> {
                    Commentaire.destroy({
                        where: { id: req.params.id }
                    })
                    .then(()=> console.log())
                    .then(()=> Message.decrement( //pour décrementer nbCommentaires de 1
                        'nbCommentaires',
                    { where: { id: req.params.id }}
                    ))
                    .then(() => res.status(200).json({ message: "commentaire supprimé" }))
                    .catch(error => res.status(400).json({ error }))
                })
            } else {
                console.log(req.params.MessageId)
                Commentaire.destroy({
                    where: { id: req.params.id }
                })
                .then(()=> console.log('destroy ok'))
                .then(() => Message.decrement( //pour décrementer nbCommentaires de 1
                    'nbCommentaires',
                { where: { id: req.params.MessageId }}
                ))
        //        .then(()=> console.log(message.nbCommentaires))
                .then(() => res.status(200).json({ message: "commentaire supprimé" }))
                .catch(error => res.status(400).json({ error }))   
            }
        } else {
            console.log('test')
            throw "ACTION NON AUTORISEE"
        }
    })
    .then(console.log('pas de Commentaire'))
    .catch(error => res.status(400).json({ error }))      
}

/***
 * GET commentaires d'un message
 */
exports.getCommentaires = (req, res, next)=>{
    let order = req.query.order
    Commentaire.findAll({

        order: [(order != null) ? order.split(':') : [ 'createdAt', 'DESC' ]],
        where: { MessageId: req.params.MessageId },
        include: [{
            model: User,
            attributes: [ 'nom', 'prenom', 'id' ]

        }]

    })
    .then(console.log(User.nom))
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error })); //syntaxe invalide
}
/**
 * GET un commentaire
 */
exports.getCommentaireById = (req, res, next)=>{

    Commentaire.findOne({

        where: { id: req.params.id },
        include: [{
            model: User,
            attributes: [ 'nom', 'prenom' ]

        }]

    })
    .then(console.log(User.nom))
    .then(commentaire => res.status(200).json(commentaire))
    .catch(error => res.status(404).json({ error })); //syntaxe invalide
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
    const cleanImageComm = clean(req.body.imageComm)

    Commentaire.findOne({
        where: {
            id: req.params.id
        }
    })
    .then( Commentaire => {
        if ( Commentaire.UserId == UserId){
            console.log(cleanTexte)
            Commentaire.update({
                texte: cleanTexte,
                imageComm: cleanImageComm
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