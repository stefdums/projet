const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
}

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{ // on indique où mettre le fichier 
        callback(null, 'images')
    },
    
    filename: (req, file, callback) =>{ // on indique le nom du fichier

//on remplace les espaces dans le nom du fichier
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
// on rend le nom unique        
        callback(null, name + Date.now() + '.' + extension);
    },
    
});


module.exports = multer({
    storage: storage,
    fileFilter: ( req, file, callback) =>{
  
        if( MIME_TYPES[file.mimetype] == undefined){
            console.log(file.mimetype)
            return callback(null, false, new Error('I don\'t have a clue!'))
        }else{
            callback(null, true)
        }
     //   cb(new Error('I don\'t have a clue!'))
    },
    limits:{ fileSize : 1024*1024 }
}).single('image');