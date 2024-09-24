const express = require("express");
const router = express.Router();
const { StudyContestPost } = require("../models/StudyContestPost");
const { auth } = require("../middleware/auth");

router.get("/get", (req, res) => {
  StudyContestPost.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
});
router.get("/:postId", (req, res) => {
  StudyContestPost.findById(req.params.postId)
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});
router.post("/add", auth, (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const studyContestPost = new StudyContestPost({
    ...req.body,
    writer: req.user._id, 
  });

  studyContestPost.save((err, postInfo) => {
    // 몽고디비에서 오는 메소드
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      // status(200)은 성공했다는 뜻
      success: true,
    });
  });
});

module.exports = router;
