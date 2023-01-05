import express from "express";
import {
  createComment,
  getComments,
} from "../Controllers/CommentController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();
router.use(authMiddleWare);

router.post("/:id", createComment);
router.get("/:id", getComments);

export default router;
