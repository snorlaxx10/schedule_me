const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    profilePicture: {
      type: String,
      default: "assets/default_pfp.jpeg",
    },
    bioDescription: {
      type: String,
      default: "Write your Bio here...",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
