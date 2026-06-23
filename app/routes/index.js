import express from 'express';
const router = express();

import userRoutes from "./user.js";
import woodRoutes from "./wood.js";

router.use("/auth", userRoutes);
router.use("/woods", woodRoutes);

export default router;
