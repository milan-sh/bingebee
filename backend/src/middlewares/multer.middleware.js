// Import the multer library which handles multipart/form-data (file uploads)
import multer from "multer";

// Configure storage settings for uploaded files
const storage = multer.diskStorage({
    // Define the destination directory for uploaded files
    destination: function (req, file, cb) {
      // The files will be saved in './public/temp' directory
      // First param (null) means no error occurred
      cb(null, './public/temp')
    },
    // Define how uploaded files should be named
    filename: function (req, file, cb) {
      // Keep the original file name (could add timestamp or other unique identifiers here)
      cb(null, file.originalname)
    }
  })
  
// Create and export the configured multer middleware instance
// This will be used in routes to handle file uploads
export const upload = multer({ 
    storage: storage // Use the disk storage configuration we defined above
})