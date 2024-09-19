
// const router = require("express").Router();
// const auth = require("../middleware/auth");
// const authAdmin = require("../middleware/authAdmin");
// const fs = require("fs");
// const multer = require("multer");
// const path = require("path");
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// if (!cloudinary.config().cloud_name || !cloudinary.config().api_key || !cloudinary.config().api_secret) {
//   throw new Error("Cloudinary configuration is missing. Please check your environment variables.");

// }
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); 
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext); 
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/upload", auth, authAdmin, upload.single("file"), (req, res) => {
//   try {
//     if (!req.file || Object.keys(req.file).length === 0){
//       return res.status(400).send({ msg: "No file were uploaded" });
//   }

//   console.log(req.file);

//     const file = req.file;

//     if (file.size > 1024 * 1024) {
//       removeTmp(file.path);
//       return res.status(400).json({ msg: "Size too large" });
//     }

//     if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
//       removeTmp(file.path);
//       return res.status(400).json({ msg: "File format is incorrect" });
//     }

//     cloudinary.uploader.upload(
//       file.path,
//       { folder: "uploads" },
//       async (err, result) => {
//         if (err) {
//             removeTmp(file.path);
//             return res.status(500).json({ msg: err.message });
//         }
        
//         removeTmp(file.path);

//         res.json({ public_id: result.public_id, url: result.secure_url });

//       }
//     );
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// router.post("/destroy", auth, authAdmin, (req, res) => {
//   try {
//     const { public_id } = req.body;
//     if (!public_id) return res.status(400).json({ msg: "No images Selected" });

//     cloudinary.uploader.destroy(public_id, async (err, result) => {
//       if (err) return res.status(500).json({ msg: err.message });

//       res.json({ msg: "Deleted" });
//     });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

// const removeTmp = (filePath) => {
//   fs.unlink(filePath, (err) => {
//     if (err) console.error('Failed to delete temp file:', err);
//   });
// };

// module.exports = router;



const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); 
    cb(null, Date.now() + ext); 
  },
});

const upload = multer({ storage: storage }); 

router.post("/upload", auth, authAdmin, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ msg: "No file was uploaded" });
    }

    const file = req.file;

  
    if (file.size > 1024 * 1024) {
      removeTmp(file.path);
      return res.status(400).json({ msg: "File size too large" });
    }

    
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.path);
      return res.status(400).json({ msg: "Invalid file format" });
    }

    const image_url = `http://localhost:5000/uploads/${req.file.filename}`;
    res.status(201).json({
      success: 1,
      file: {
        filename: req.file.filename,
        url: image_url,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


    

router.post("/destroy", auth, authAdmin, (req, res) => {
  try {
    const { filename } = req.body;
    if (!filename) return res.status(400).json({ msg: "No file specified" });

    const filePath = path.join(__dirname, "../uploads/", filename);
    
    fs.unlink(filePath, (err) => {
      if (err) return res.status(500).json({ msg: err.message });

      res.json({ msg: "File deleted" });
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


const removeTmp = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error('Failed to delete temp file:', err);
  });
};

module.exports = router;
