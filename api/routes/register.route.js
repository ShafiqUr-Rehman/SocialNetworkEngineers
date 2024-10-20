import express from 'express';
import { registerEngineer, fetchEngineers } from '../controllers/register.controller.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/enroll', upload.single('cv'), registerEngineer);
router.get('/fetch', fetchEngineers);

export default router;