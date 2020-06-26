const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next)=>{
    try{
// on recupere le token dans le header        
        const token = req.headers.authorization.split(' ')[1];
// on decode le token avec jwt et la clé         
        const decodedToken = jwt.verify(token, process.env.SECRET);
//on recupere le isAdmin
        const isAdmin = decodedToken.isAdmin;

        if( isAdmin !== 1 ){
            throw "Vous n'avez pas les droits";
        } else{
            next();
        }
    }catch (error) {res.status(401).json({  
            error: error | "Vous n'avez pas acces à cette liste "
        })
    }
}