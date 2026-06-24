import express from 'express';
const router = express();
import * as woodController from '../controllers/wood.js';

router.get('/', woodController.readAll);
router.get('/:hardness', woodController.readByHardness);

export default router;