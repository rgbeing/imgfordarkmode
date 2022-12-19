var express = require('express');
var router = express.Router();

const crypto = require('crypto');
var fs = require('fs');

const socket = require('../services/imgfordark/socket').socket;

// multer setup
const multer = require('multer');

const storage = multer.memoryStorage();
/* DISK STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/imgfordark')
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    let randString = crypto.randomBytes(8).toString('hex');
    let filename = randString + Date.now() + ext;

    cb(null, filename);
  }
});
*/
const upload = multer({ 
  storage : storage,
  limit : {fileSize : 5242880}, // 5MB
  fileFilter: (req, file, cb) => {
    // only images
    if (file.mimetype == "image/png" 
      || file.mimetype == "image/jpg" 
      || file.mimetype == "image/jpeg"
      || file.mimetype == "image/webp") {
      cb(null, true);
    } else {
      cb(null, false);
    }}
  }
);

// router
router.get('/', function(req, res, next) {
  res.render('imgfordark');
});

router.post('/', upload.single('uploaded-image'), function(req, res, next) {
  let newFileName = (() => {
    let randString = crypto.randomBytes(8).toString('hex');
    let filename = randString + Date.now() + '.png';

    return filename;
  })();
  socket.emit(newFileName, req.file.buffer, (response) => {
    res.render('result', {data: response.toString('base64')});
  });
});
  
module.exports = router;