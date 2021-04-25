const multer = require('multer')

// Local
const localUpload = multer({ dest: '../public/uploads/' })

module.exports = { localUpload }