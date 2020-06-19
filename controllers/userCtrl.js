const bcrypt = require('bcrypt')
const jwt = require('json-web-token')
const User = require('../models').User

let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/;

exports.signup = (req, res, next)=>{
    if (regexPwd.test(req.body.password)){
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                email: req.body.email,
                password: hash
            })
            .then(()=> res.status(201).json({ message: 'utilisateur créée'}))
            .catch(error => res.status(400).json({error})) //syntaxe invalide
        })
        .catch(error => res.status(500).json({error})) //Le serveur a rencontré une situation qu'il ne sait pas traiter.
    }
    else {
        return res.status(401).json({error: "Password non conforme"}) //Non autorisé
    }  
}