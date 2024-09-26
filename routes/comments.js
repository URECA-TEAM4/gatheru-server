const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment"); // 모델 스키마 가져오기

router.get("/get", (req, res) => {
  Comment.find()
    .then((comments) => res.json(comments))
    .catch((err) => res.json(err));
});

router.post("/save", (req, res) => {
  const comments = new Comment(req.body);

  comments.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, result });
      });
  });
});

module.exports = router;
