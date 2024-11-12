import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image") {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Images only"), false);
    }
  } else if (file.fieldname === "code") {
    if (file.mimetype === "application/x-zip-compressed") {
      cb(null, true);
    } else {
      cb(new Error("Only ZIP files are allowed"), false);
    }
  } else {
    cb(new Error("Unexpected field"), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post("/image", upload.single("image"), (req, res) => {
  if (req.file) {
    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${req.file.path}`,
    });
  } else {
    res.status(400).send({ message: "No image file provided" });
  }
});

router.post("/code", upload.single("code"), (req, res) => {
  if (req.file) {
    res.status(200).send({
      message: "Code ZIP file uploaded successfully",
      code: `/${req.file.path}`,
    });
  } else {
    res.status(400).send({ message: "No ZIP file provided" });
  }
});

export default router;