const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next)=>{
    try{
// on recupere le token dans le header        
        const token = req.headers.authorization.split(' ')[1];
// on decode le token avec jwt et la clé         
        const decodedToken = jwt.verify(token, process.env.SECRET);
// on recupere le userId        
        const UserId = decodedToken.UserId;
// on compare le userId de la requete et celui du token 
        if( req.body.UserId && req.body.UserId !== UserId ){
            throw 'User ID non valable';
        } else{
            next();
        }
    }catch (error) { res.status(401).json({  
            error: error |'requete non authentifiée'
        })
    }
}