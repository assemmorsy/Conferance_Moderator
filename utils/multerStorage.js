const multer = require('multer')
const path = require("path")
const fs = require('fs')

let doctorsProfilesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = path.join(process.cwd(), 'public', 'images', 'doctors-profiles')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let fileName;
    const fileData = file.originalname.split(".");

    if (process.env.NODE_ENV == 'dev') {
    // fileName = Number(new Date()).toString() + '.' + fileData[1];
    const hash = new Date().toUTCString().replace(/:/g, "-")
    fileName = `(${hash})-(${fileData[0]}).${fileData[1]}`;
    } else if (process.env.NODE_ENV == 'test') {
      fileName = 'test-sample' + '.' + fileData[1];
    }
    cb(null, fileName)
  }
})
doctorsProfilesStorage.relativePath = path.join('public', 'images', 'doctors-profiles')
doctorsProfilesStorage.endPoint = '/public/images/doctors-profiles/'


module.exports = { doctorsProfilesStorage }
