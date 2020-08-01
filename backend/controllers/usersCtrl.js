const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models').User
const Message = require('../models').Message
require('dotenv').config();
const fs = require('fs')

let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,})/;
let regexMail = /.+@.+\..+/;

const clean = require('xss-clean/lib/xss').clean

/***
 * POST INSCRIPTION
 */
exports.inscription = (req, res, next)=>{
    
    if (!regexMail.test(req.body.email)){
        return res.status(400).json({ error: 'email non conforme' })
    } 
    if (!regexPwd.test(req.body.password)){
        return res.status(400).json({ error: ' Mot de passe nom conforme ' })
    } 
    bcrypt.hash(req.body.password, 10)

    .then(hash => {

        const cleanNom = clean((req.body.nom).toUpperCase())
        const cleanPrenom = clean((req.body.prenom).toLowerCase())
        if(req.file){
            User.create({
                nom: cleanNom,
                prenom: cleanPrenom,
                email: req.body.email,
                password: hash,
                photoProfil: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    
            })
            .then(()=> res.status(201).json({ message: 'utilisateur créée'}))
            .catch(error => res.status(400).json({error})) 
        }
        else{
            User.create({
                nom: cleanNom,
                prenom: cleanPrenom,
                email: req.body.email,
                password: hash,
                photoProfil: `${req.protocol}://${req.get('host')}/images/user_profil_default.png`,  
            })
            .then(()=> res.status(201).json({ message: 'utilisateur créée'}))
            .catch(error => res.status(400).json({error}))
        }    
    })
    .catch(error =>{ res.status(500).json({error})}) 
}

/***
 * POST CONNEXION
 */
exports.connexion = (req, res, next) =>{

    User.findOne({
        where: { email: req.body.email }
    })
    .then( User => {
        
        if (!User){
            return res.status(401).json({error: "utilisateur non trouvé"})
        }
        bcrypt.compare(req.body.password, User.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({ error: 'Mot de passe incorrect' })
            }
            res.status(200).json({
                UserId: User.id,
                isAdmin: User.isAdmin,
                token: jwt.sign({ 
                        UserId: User.id,
                        isAdmin: User.isAdmin
                    },
                    process.env.SECRET,
                    { 
                        expiresIn: '12h'
                    }
                )
            })
        })
        .catch(error => res.status(500).json({ error: 'pb de jwt' })) 
    })
    .catch(error => res.status(500).json({ error })) 

}

/***
 * GET inscriptions
 */
exports.getInscriptions = (req, res, next)=>{
    let order = req.query.order
    User.findAll({
        order: [(order != null) ? order.split(':') : [ 'nom', 'ASC' ]],
        attributes: [ 'id', 'nom', 'prenom', 'email', 'createdAt','isAdmin', 'photoProfil']
    
        
    })
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error })); 
}
/***
 * GET One inscription
 */
exports.getOneInscription = (req, res, next)=>{

    User.findOne({
        where: { id: req.params.id},
        attributes: [ 'id', 'nom', 'prenom', 'email', 'createdAt', 'isAdmin', 'photoProfil']
        
    })
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(404).json({ error })); 
}
/**
 * DELETE inscription
 */
exports.deleteInscription = (req, res, next)=>{
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
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then ( User => {
        if ( User.id == UserId || isAdmin === 1 ){
            const filename = User.photoProfil.split('/images/')[1];

            if(filename != "user_profil_default.png"){
                fs.unlink(`images/${filename}`, ()=> {

                    User.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(() => res.status(200).json({ message: "compte supprimé" }))
                    .catch( error => res.status(400).json({ error }))
                })
            }else {
                User.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({ message: "compte supprimé" }))
                .catch( error => res.status(400).json({ error }))
            }
            
        }
        else {
            throw "ACTION NON AUTORISEE" 
        }
        
    })

    .catch( error => res.status(500).json({ error }) )
}
/**
 * PUT 
 */
exports.modifyUser = (req, res, next)=>{
    const cleanNom = clean(req.body.nom)
    const cleanPrenom = clean(req.body.prenom)
    /***
     * recuperation de UserId et isAdmin
     */
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const UserId = decodedToken.UserId;
    const isAdmin = decodedToken.isAdmin;
    /**
     * recuperation User à modifier
     */
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then( User => {  
        if( User.id == UserId && regexMail.test(req.body.email)){
            User.update({
                nom: cleanNom,
                prenom: cleanPrenom,
                email: req.body.email,
                photoProfil: `${req.protocol}://${req.get('host')}/images/${req.body.filename}`     
            },{
                where: {
                    id: req.params.id
                }
            })
            .then(()=> res.status(200).json({ message: 'compte modifié' }))
            .catch( error => res.status(404).json({ error }))  
        }
        else {
            throw "ACTION NON AUTORISEE" 
        }   
    })
    .catch( error => res.status(500).json({ error }))
}
/**
 * GET tout les messages par UserId
 */
exports.getMessagesByUserId = (req, res, next)=>{
    let order = req.query.order
    Message.findAll({
        where: { UserId: req.params.id },
        order: [(order != null) ? order.split(':') : [ 'createdAt', 'DESC' ]],

        include: [{
            model: User,
            attributes: [ 'nom', 'prenom' ]

        }]
        
    })
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(404).json({ error })); 
}