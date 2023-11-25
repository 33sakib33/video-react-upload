const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3001;
const cors = require('cors'); // Import the cors middleware

// Enable CORS for all routes
app.use(cors());

// Multer configuration
//create the uploads folder before running this************************
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for the uploaded file
  },
});

const upload = multer({ storage: storage });

// Route to handle video uploads
app.post('/upload', upload.single('video'), (req, res) => {
  try {
    // The uploaded file is available at req.file
    console.log(req.file.filename)
    const videoPath = path.join(__dirname, 'uploads', req.file.filename);

    // Process the videoPath as needed (e.g., save it to a database, etc.)
    console.log('Received video at path:', videoPath);

    res.status(200).json({ success: true, message: 'Video received successfully' });
  } catch (error) {
    console.error('Error handling video upload:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
