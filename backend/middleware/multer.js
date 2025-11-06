import multer from 'multer';
import path from 'path';

// Save files temporarily in a temp folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './temp'); // make sure 'temp' folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export default upload;
