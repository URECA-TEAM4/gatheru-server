const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = mongoose.Schema(
  {
    sender: {
      type: String,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    postType: {
      type: String,
    },
    postTitle: {
      type: String,
    },
    message: {
      type: String,
      maxlength: 50,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = { Notification };
