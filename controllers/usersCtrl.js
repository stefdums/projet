const bcrypt = require('bcrypt')
const jwt = require('json-web-token')
const User = require('../models').User
require('dotenv').config();

let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/;
let regexMail = /.+@.+\..+/;


/***
 * POST INSCRIPTION
 */
exports.inscription = (req, res, next)=>{

//    if (regexPwd.test(req.body.password) && (regexMail.test(req.body.email))){
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
    // else {
    //     return res.status(401).json({error: "Password non conforme"}) //Non autorisé
    // }  
//}

/***
 * POST CONNEXION
 */
exports.connexion = (req, res, next) =>{

    User.findOne({ email: req.body.email })
    .then( user => {
        if (!user){
            return res.status(401).json({error: "utilisateur non trouvé"})
        }
        bcrypt.compare(req.body.password, Users.password)
        .then(valid => {res.status(200).json({
            UserId: Users.id,
            token: jwt.sign(
                { UserId: Users.id},
                process.env.SECRET,
                { expiresIn: '24h'}
            )
            })
        })

    })
}