import express from 'express';
const router = express();
import * as woodController from '../controllers/wood.js';

router.get('/', woodController.readAll);

export default router;