const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next)=>{
    try{
// on recupere le token dans le header        
        const token = req.headers.authorization.split(' ')[1];
// on decode le token avec jwt et la clé         
        const decodedToken = jwt.verify(token, 'token');
// on recupere le userId        
        const UserId = decodedToken.UserId;
//on recupere le isAdmin
    //    const isAdmin = decodedToken.isAdmin;
// on compare le userId de la requete et celui du token 
        if( req.body.UserId && req.body.UserId !== UserId ){
            throw 'User ID non valable';
        } else{
            next();
        }
    }catch {
        res.status(401).json({  
            error: new Error('requete non authentifiée')
        })
    }
}