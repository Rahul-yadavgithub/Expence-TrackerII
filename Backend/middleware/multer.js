const multer = require("multer");

const storage = multer.memoryStorage(); // store in memory

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowedTypes.includes(file.mimetype)){
    cb(null, true);
  }
  else{
    cb(new Error("Only jpeg, jpg, or png are allowed"), false);
  }
  
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
