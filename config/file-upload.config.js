const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')


// Local
const localUpload = multer({ dest: './public/uploads/' })



// // Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET
// })

// const storage = new CloudinaryStorage({ cloudinary })
// const CDNupload = multer({ storage })



// Object export with both setups
module.exports = { localUpload, CDNupload }