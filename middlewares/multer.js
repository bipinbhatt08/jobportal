const multer = require("multer");

var storage = multer.diskStorage({

  destination: function (req, file, cb) {

    // logic to validate file type(mimeType)

    // ani size chai file.size ma aauxa ani value byte ma hunxa

    const allow = [ 'image/jpeg','image/png','image/jpg','']
    if(!allow.includes(file.mimetype)){
      cb(new Error("Invalid file type. Only supports: jpeg,png and jpg"))//eutai argument xa vane error
      return
    }


    cb(null, "./public/uploads/");//duita xa vane success
  },
  filename: function (req, file, cb) {
    cb(null, (Date.now() + "-" + file.originalname).replace(" ",""));
  },
});

module.exports = {
  multer,
  storage,
};