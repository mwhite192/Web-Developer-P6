// set up multer to store images in the backend/images folder
const multer = require('multer');

// sets the file types that can be uploaded
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

// sets the storage location and file name
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
}); 

// exports multer middleware
module.exports = multer({storage: storage}).single('image');