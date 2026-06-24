import multer from 'multer';
import fs from 'fs';

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/png": "png",
    "image/webp": "webp",
};

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0].replace(/\s+/g, '_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + "_" + Date.now() + "." + extension);
    },
});

export default multer({ storage: storage }).single("image");
