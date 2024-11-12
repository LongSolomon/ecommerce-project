// backend/routes/codeRoutes.js
import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  getCodeStructure,
  getFileContent,
  downloadCode
} from "../controllers/codeController.js";

const router = express.Router();

router.use(authenticate);
// backend/routes/codeRoutes.js
router.get('/:productId/structure', getCodeStructure);
router.get('/:productId/file/:filePath(*)', getFileContent);
router.get('/:productId/download', downloadCode);

export default router;