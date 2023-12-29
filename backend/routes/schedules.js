const router = require("express").Router();
const Schedule = require("../models/Schedule");

// Create schedule
router.post("/", async (req, res) => {
  const newSchedule = new Schedule(req.body);
  try {
    const savedSchedule = await newSchedule.save();
    res.status(200).json(savedSchedule);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get scheduleName and id for all schedules from specific user
router.get("/:id", async (req, res) => {
  try {
    const schedules = await Schedule.find(
      { userId: req.params.id },
      { scheduleName: 1, major: 1 }
    );
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get data from a specific schedule
router.get("/scheduledata/:id", async (req, res) => {
  try {
    const scheduleData = await Schedule.find({ _id: req.params.id });
    res.status(200).json(scheduleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a schedule.
router.delete("/scheduledata/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    await schedule.deleteOne();
    res
      .status(200)
      .json("Schedule " + schedule.scheduleName + " has been deleted.");
  } catch (err) {
    res.status(500).json("ERROR");
  }
});

//update schedule data
router.put("/scheduledata", async (req, res) => {
  try {
    await Schedule.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json("Updated schedule data");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Calculate total semester units
router.get("/totalUnits/:id", async (req, res) => {
  try {
    // const totalUnits = await Schedule.find({ _id: req.params.id });
    // res.status(200).json(totalUnits);
    const test = await Schedule.aggregate([
      {
        $match : {userId : req.params.id},
      },
      {
        $group : {
          _id : "$major",
          //totalSum : {$sum : "$courseUnits"} 
        }
      }, 
    ]);
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json("wrong");
  }
});
module.exports = router;
