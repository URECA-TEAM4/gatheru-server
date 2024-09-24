const express = require("express");
const router = express.Router();
const { MogakoPost } = require("../models/MogakoPost"); // 모델 스키마 가져오기
const { auth } = require("../middleware/auth"); // 사용자 인증 미들웨어 가져오기

// 사용자가 작성한 글 가져오기 (인증된 사용자만 접근 가능)
router.get("/myposts", auth, (req, res) => {
    const userId = req.user.id; // 인증된 사용자 ID 가져오기
    MogakoPost.find({ writer: userId }) // 작성자가 userId인 글 찾기
      .then(posts => res.json(posts))
      .catch(err => res.status(500).json({ error: err.message }));
  });

// 특정 글 가져오기 (ID로 조회)
router.get("/:postId", (req, res) => {
  MogakoPost.findById(req.params.postId)
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json({ success: false, err }));
});

// 새로운 글 추가하기
router.post("/add", auth, (req, res) => {
  const mogakoPost = new MogakoPost({
    ...req.body,
    writer: req.user._id, // 글 작성자를 현재 인증된 사용자로 설정
  });

  mogakoPost.save((err, postInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

module.exports = router;
