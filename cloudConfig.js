const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//This is fixed with all the names
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'UrbanNest_dev',
      allowedFormats:["png","jpeg","jpg"], // supports promises as well
    },
  });

//   We will use them in listing.js routes
  module.exports={
    cloudinary,
    storage
  }