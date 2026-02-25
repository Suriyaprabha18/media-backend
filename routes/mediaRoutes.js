const express = require("express");
const router = express.Router();
const multer = require("multer");
const Media = require("../models/Media");
const auth = require("../middleware/auth");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// UPLOAD (Protected)
router.post("/upload", auth, upload.single("media"), async (req, res) => {
  const newMedia = new Media({
    filename: req.file.filename,
    filepath: req.file.path,
    filetype: req.file.mimetype,
    userId: req.user.id
  });

  await newMedia.save();
  res.json({ message: "Uploaded successfully" });
});

// GET MEDIA (Search included)
router.get("/", auth, async (req, res) => {
  const search = req.query.search || "";

  const media = await Media.find({
    userId: req.user.id,
    filename: { $regex: search, $options: "i" }
  }).sort({ createdAt: -1 });

  res.json(media);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  const media = await Media.findById(req.params.id);

  if (!media) return res.status(404).json({ message: "Not found" });

  fs.unlinkSync(media.filepath); // delete file
  await media.deleteOne();

  res.json({ message: "Deleted successfully" });
});

module.exports = router;