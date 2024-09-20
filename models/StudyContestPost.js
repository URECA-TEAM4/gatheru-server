const mongoose = require("mongoose"); // 몽구스를 가져온다.
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId, // ObjectId 하나의 정보로 user에 있는 모든 정보들을 가져올 수 있다.
      ref: "User", // User에 생성된 모든 정보를 가져온다.
    },
    title: {
      type: String,
      maxlength: 50,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      //study or contest
      type: String,
      required: true,
    },
    registeredNum: {
      //모집한 인원 수
      type: Number,
      default: 0,
    },
    maximumNum: {
      //모집 인원 수
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    method: {
      //온라인, 오프라인, 둘다, 미정
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StudyContestPost = mongoose.model("StudyContestPost", postSchema); // 스키마를 모델로 감싸준다.

module.exports = { StudyContestPost }; // 다른 곳에서도 사용할 수 있도록 export 해준다.
