const express = require("express");
const router = express.Router();
const { User } = require("../models/User"); // 모델 스키마 가져오기
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

// auth 미들웨어를 통과해야 다음으로 넘어감
router.get("/auth", auth, async (req, res) => {
  try {
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true, // 정책에 따라 바뀔 수 있음
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      image: req.user.image,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.post("/register", (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body); // body parser를 이용해서 json 형식으로 정보를 가져온다.

  user.save((err, userInfo) => {
    // 몽고디비에서 오는 메소드
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      // status(200)은 성공했다는 뜻
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "이메일에 해당하는 유저가 없습니다.",
        });
      }
      // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
        }
        // 비밀번호까지 맞다면 토큰 생성
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          // 쿠키에 토큰을 저장한다.
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    }
  );
});

// 로그아웃
router.get("/logout", auth, (req, res) => {
  console.log(req.user);
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

router.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

module.exports = router;
