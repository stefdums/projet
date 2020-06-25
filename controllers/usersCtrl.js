const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models').User
require('dotenv').config();

let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/;
let regexMail = /.+@.+\..+/;


/***
 * POST INSCRIPTION
 */
exports.inscription = (req, res, next)=>{

    if (regexMail.test(req.body.email)){
        return res.status(400).json({ error: 'email non conforme' })
    } 
    if (regexPwd.test(req.body.password)){
        return res.status(400).json({ error: ' Mot de passe nom conforme ' })
    }   
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        User.create({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: hash,    
        })
        .then(()=> res.status(201).json({ message: 'utilisateur créée'}))
        .catch(error => res.status(400).json({error})) //syntaxe invalide
    })
    .catch(error => res.status(500).json({error})) //Le serveur a rencontré une situation qu'il ne sait pas traiter.
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
                token: jwt.sign({ 
                        UserId: User.id,
                        isAdmin: User.isAdmin
                    },
                    'token',
                    { 
                        expiresIn: '12h'
                    }
                )
            })
        })
        .catch(error => res.status(500).json({ error: 'pb de jwt' })) //Le serveur a rencontré une situation qu'il ne sait pas traiter.


    })
    .catch(error => res.status(500).json({ error })) //Le serveur a rencontré une situation qu'il ne sait pas traiter.

}