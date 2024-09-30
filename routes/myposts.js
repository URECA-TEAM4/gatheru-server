const express = require("express");
const router = express.Router();
const { MogakoPost } = require("../models/MogakoPost"); // 모델 스키마 가져오기
const { auth } = require("../middleware/auth"); // 사용자 인증 미들웨어 가져오기
const { StudyContestPost } = require("../models/StudyContestPost") // 모델 스키마 가져오기
// 사용자가 작성한 글 가져오기 (인증된 사용자만 접근 가능)
router.get("/myposts", auth, (req, res) => {
  Promise.all([
    StudyContestPost.find({ writer: req.user._id }), // StudyContestPost에서 글 가져오기
    MogakoPost.find({ writer: req.user._id }) // MogakoPost에서 글 가져오기
  ])
  .then(([studyContestPosts, mogakoPosts]) => {
    const allPosts = [...studyContestPosts, ...mogakoPosts]; // 두 게시글 목록을 하나로 합침
    res.json(allPosts); // 합쳐진 게시글 목록을 응답
  })
  .catch(err => res.json({ success: false, err }));
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

// 게시글 삭제
router.post("/delete", (req, res) => {
  const { postId, postType } = req.body;

  // postType에 따라 적절한 모델에서 삭제
  if (postType === "mogako") {
    MogakoPost.findOneAndDelete({ _id: postId })
      .exec((err) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true });
      });
  } else if (postType !== "mogako") {
    StudyContestPost.findOneAndDelete({ _id: postId })
      .exec((err) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true });
      });
  } else {
    return res.status(400).json({ success: false, message: "유효하지 않은 게시글 유형입니다." });
  }
});

// 게시글 수정
router.post("/update", (req, res) => {
  const { postId, postType } = req.body;

  const updateMogakoFields = {
    title: req.body.title,
    content: req.body.content,
    datetime: new Date(req.body.datetime), // ISO 형식의 날짜를 Date 객체로 변환
    maximumNum: req.body.maximumNum,
    location: req.body.location,
  };

  const updateStudyFields = {
    title: req.body.title,
    content: req.body.content,
    deadline: new Date(req.body.deadline), // ISO 형식의 날짜를 Date 객체로 변환
    maximumNum: req.body.maximumNum,
    type: req.body.editedType,
    method: req.body.editedMethod,
  };
  
  // postType에 따라 적절한 모델에서 수정
  if (postType === "mogako") {
    MogakoPost.findOneAndUpdate(
      { _id: postId },  // 업데이트할 게시글의 ID
      { $set: updateMogakoFields },    // 업데이트할 필드를 모두 한 번에 설정
      { new: true }              // 업데이트 후의 새로운 데이터 반환
    )
      .populate('writer')         // 필요한 경우 writer 필드도 같이 반환
      .exec((err, updatedPost) => {
        if (err) return res.status(400).send(err);  // 에러 발생 시 처리
        return res.status(200).json({ success: true, updatedPost });  // 성공 시 업데이트된 게시글 반환
      });

  } else if (postType !== "mogako") {
    StudyContestPost.findOneAndUpdate(
      { _id: postId },  // 업데이트할 게시글의 ID
      { $set: updateStudyFields },    // 업데이트할 필드를 모두 한 번에 설정
      { new: true }              // 업데이트 후의 새로운 데이터 반환
    )
      .populate('writer')         // 필요한 경우 writer 필드도 같이 반환
      .exec((err, updatedPost) => {
        if (err) return res.status(400).send(err);  // 에러 발생 시 처리
        return res.status(200).json({ success: true, updatedPost });  // 성공 시 업데이트된 게시글 반환
      });
  } else {
    return res.status(400).json({ success: false, message: "유효하지 않은 게시글 유형입니다." });
  }





});

module.exports = router;
