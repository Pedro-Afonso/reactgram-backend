import path from "path";
import multer from "multer";

// Destination to store image
const imageStorage = multer.diskStorage({
  destination(req, _, cb) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }
    cb(null, `src/uploads/${folder}`);
  },

  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    // upload only png and jpg format
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(
        new Error("Por favor, envie apenas fotos no formato png ou jpg!")
      );
    }

    cb(null, true);
  },
});

export { imageUpload };
