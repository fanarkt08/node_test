import express from 'express';
const router = express();
import * as woodController from '../controllers/wood.js';
import auth from '../middlewares/auth.js';

router.get('/', auth, woodController.readAll);
router.get('/:hardness', auth, woodController.readByHardness);

export default router;