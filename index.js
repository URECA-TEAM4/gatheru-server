const express = require("express");
const app = express();
const port = 5000;

const bodyParser = require("body-parser"); // req.body
const cookieParser = require("cookie-parser");

// url 파싱해서 데이터 가져올 수 있도록 함
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 온 데이터도 분석해서 가져올 수 있도록 함
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB
const config = require("./config/key.js");
const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB 연결 오류:", err);
    process.exit(1); // 연결 실패 시 프로세스 종료
  }
};
dbConnect();

app.use("/api/users", require("./routes/users"));
app.use("/api/mogakos", require("./routes/mogakos"));
app.use("/api/studyContests", require("./routes/studyContests"));
const postsRouter = require('./routes/myposts'); // myposts 라우터 추가
app.use('/api/posts', postsRouter); // 경로 설정
app.use("/api/notifications", require("./routes/notifications"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
