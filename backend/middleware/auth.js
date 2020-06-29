const jwt = require('jsonwebtoken');
//const { getMessages } = require('../controllers/messagesCtrl');
const Message = require('../models/Message');
const User = require('../models/User');
require('dotenv').config();

module.exports = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const UserId = decodedToken.UserId;
        const isAdmin = decodedToken.isAdmin;

        const verifMessage = (req, res, next)=>{
            Message.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then( Message => {
                if (isAdmin !== 1){
                    if ( UserId !== Message.UserId ) {
                       throw 'non'
                    }
                    else {
                       next()
                    }   
                }
                else{
                    next()
                }
            })
        }   
    }catch (error) { res.status(401).json({  
        error: error |'requete non authentifiée'
    })
}
}