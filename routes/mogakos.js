const express = require("express");
const router = express.Router();
const { MogakoPost } = require("../models/MogakoPost"); // 모델 스키마 가져오기

router.get("/get", (req, res) => {
  MogakoPost.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
});

router.post("/add", (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const mogakoPost = new MogakoPost(req.body); // body parser를 이용해서 json 형식으로 정보를 가져온다.

  mogakoPost.save((err, postInfo) => {
    // 몽고디비에서 오는 메소드
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      // status(200)은 성공했다는 뜻
      success: true,
    });
  });
});

module.exports = router;
