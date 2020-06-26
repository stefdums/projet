const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'video/mp4': 'mp4'
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
    }
});    

module.exports = multer({ storage: storage}).single('image');