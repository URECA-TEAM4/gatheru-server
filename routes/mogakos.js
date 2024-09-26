const express = require("express");
const router = express.Router();
const { MogakoPost } = require("../models/MogakoPost"); // 모델 스키마 가져오기

router.get("/get", (req, res) => {
  MogakoPost.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
});

router.get("/:postId", (req, res) => {
  MogakoPost.findById(req.params.postId)
    .then((post) => res.json(post))
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

// 신청자 추가
router.post("/join", (req, res) => {
  const { postId, userId } = req.body;

  // 게시글을 찾아서 신청자 배열에 userId 추가
  MogakoPost.findByIdAndUpdate(
    postId,
    {
      $addToSet: { joinedUser: userId }, // joinedUser 배열에 userId 추가
      $inc: { registeredNum: 1 }, // registeredNum 1 증가
    },
    { new: true } // 업데이트된 문서 반환
  )
    .then((updatedPost) => {
      if (!updatedPost)
        return res
          .status(404)
          .json({ success: false, message: "게시글을 찾을 수 없습니다." });
      res.status(200).json({ success: true, updatedPost });
    })
    .catch((err) => res.status(400).json({ success: false, err }));
});

// 신청자 삭제
router.post("/unJoin", (req, res) => {
  const { postId, userId } = req.body;

  // 게시글을 찾아서 신청자 배열에서 userId 제거
  MogakoPost.findById(postId)
    .then((post) => {
      if (!post)
        return res
          .status(404)
          .json({ success: false, message: "게시글을 찾을 수 없습니다." });

      // 신청자 배열에서 userId 제거
      post.joinedUser.pull(userId); // applicants 배열에서 userId 제거
      post.registeredNum -= 1; // registeredNum 1 감소
      return post.save(); // 변경사항 저장
    })
    .then((updatedPost) => {
      res.status(200).json({ success: true, updatedPost });
    })
    .catch((err) => {
      console.error(err); // 에러 내용을 콘솔에 출력
      res.status(400).json({ success: false, err });
    });
});

// 모집 현황 가져오기
router.get("/registeredNum/:postId", (req, res) => {
  // 게시글을 찾아서 registeredNum 반환
  MogakoPost.findById(req.params.postId)
    .then((post) => {
      if (!post)
        return res
          .status(404)
          .json({ success: false, message: "게시글을 찾을 수 없습니다." });
      res
        .status(200)
        .json({ success: true, registeredNum: post.registeredNum });
    })
    .catch((err) => {
      console.error(err); // 에러 내용을 콘솔에 출력
      res.status(400).json({ success: false, err });
    });
});

module.exports = router;
