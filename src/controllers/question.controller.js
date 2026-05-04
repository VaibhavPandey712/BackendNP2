import postModel from "../models/question.model.js";

export async function questionController(req, res) {
    const { title, URL, Rating } = req.body;
    console.log(req.user)
    const post = await postModel.create({
        title,
        platform: URL.includes("leetcode") ? "leetcode" : "codeforces",
        URL,
        Rating,
        user: req.user._id
    })
    res.status(201).json({
        message: "Question created successfully",
        post: post
    })
}

export async function getLeetCodeQuestions(req, res) {
    const questions = await postModel.find({
        user: req.user._id,
        platform: "leetcode"
    })
    res.json(questions)
}

export async function getCodeforcesQuestions(req, res) {
    const questions = await postModel.find({
        user: req.user._id,
        platform: "codeforces"
    })
    res.json(questions)
}

export async function deleteQuestion(req, res) {
    const { id } = req.params;
    await postModel.findOneAndDelete({
        _id: id,
        user: req.user._id
    })
    res.json({
        message: "Question deleted successfully"
    })
}