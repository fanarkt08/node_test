import express from 'express';
const router = express();
import * as woodController from '../controllers/wood.js';
import auth from '../middlewares/auth.js';
import multer from '../middlewares/multer.js';

router.post('/', auth, multer, woodController.create);
router.get('/', auth, woodController.readAll);
router.get('/:hardness', auth, woodController.readByHardness);

export default router;