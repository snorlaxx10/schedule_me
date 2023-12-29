const { off } = require("../models/User");
const User = require("../models/User");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("It's users route.");
});


//Update user
/*
params refer to url route
body and params are both frontend

 */
router.put("/:id", async (req, res) => {
  if(req.body.userId === req.params.id){
    try{
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Updated")
    }
    catch(err){}
  }
  else{
    return res.status(403).json("Only your account can be updated.")
  }
})

//Find another user's profile
router.get("/:id", async (req,res) => {
  try{
    const user = await User.find( {_id: req.params.id } );
    res.status(200).json(user);
}catch(err){
    res.status(500).json(err);
}
});

module.exports = router;
