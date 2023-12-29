const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    text: {
        type: String,
    },
    replies: {
      type: Array,
      default: [],
    },
    comId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);