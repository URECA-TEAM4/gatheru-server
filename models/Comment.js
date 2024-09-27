const mongoose = require("mongoose"); // 몽구스를 가져온다.
const Schema = mongoose.Schema;
const commentSchema = mongoose.Schema(
  {
    writerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    writer: {
      type: String,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "MogakoPost",
      ref: "StudyContestPost",
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
