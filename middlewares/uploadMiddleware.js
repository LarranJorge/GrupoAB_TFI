import fs from 'fs';
import multer from 'multer';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir(uploadDir, { recursive: true }, (err) => {
            if (err) {
                return cb(err);
            }
            cb(null, uploadDir);
        });
    },
    filename: function (req, file, cb) {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});

const fileFilter = (req, file, cb) => {
    console.log("Archivo recibido:", file.originalname);
    console.log("Mimetype detectado:", file.mimetype);
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Formato no válido. Solo se permiten imágenes.'));
    }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });