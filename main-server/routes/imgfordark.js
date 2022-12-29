var express = require('express');
var router = express.Router();

const crypto = require('crypto');

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
  limits : {fileSize : 2097152}, // 2MB
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

const fileSizeLimitErrorHandler = (err, req, res, next) => {
  if (err) {
    res.send("<script>alert('파일이 너무 큽니다.');history.back();</script>");
  } else {
    next();
  }
};

router.post('/', upload.single('uploaded-image'), fileSizeLimitErrorHandler, function(req, res) {
  if (!req.file) {
    res.send("<script>alert('올바른 파일을 올려주세요.');history.back();</script>");
  }

  let needContTouch = (req.query.cont === 't');
  let newFileName = (() => {
    let randString = crypto.randomBytes(8).toString('hex');
    let filename = randString + Date.now() + '.png';

    return filename;
  })();
  socket.emit(newFileName, {buffer: req.file.buffer, cont: needContTouch}, (response) => {
    if (Buffer.isBuffer(response)) {
      res.render('result', {data: response.toString('base64')});
    } else {
      res.send("<script>alert('올바른 파일을 올려주세요(움짤은 지원하지 않습니다).');history.back();</script>");
    }
  });
});
  
module.exports = router;