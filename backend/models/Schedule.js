const mongoose = require("mongoose");
const ScheduleSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true,
    },
    scheduleName: {
        type: String,
        required: true,
    },
    major: {
        type: String,
        required: true,
    },
    semesters: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);