import express from "express"
import postModel from "../models/question.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { questionController, getLeetCodeQuestions, getCodeforcesQuestions, deleteQuestion } from "../controllers/question.controller.js";

const router = express.Router();

// Create question (POST /api/questions)
router.post("/", authMiddleware, questionController);

// Get user's LeetCode questions (GET /api/questions/leetcode)
router.get("/leetcode", authMiddleware, getLeetCodeQuestions);

// Get user's Codeforces questions (GET /api/questions/codeforces)
router.get("/codeforces", authMiddleware, getCodeforcesQuestions);

// Delete question (DELETE /api/questions/:id)
router.delete("/:id", authMiddleware, deleteQuestion);

export default router;
