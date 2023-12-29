const router = require("express").Router();
const Comment = require("../models/Comment")

// Create comment
router.post("/", async (req, res) => {
    const newComment = new Comment(req.body)
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment)
    } catch(err) {
        res.status(500).json(err)
    }
})

// Update comment with replies
router.put("/:id/reply", async (req, res) => {
    try {
      const comment = await Comment.findOne( {comId: req.params.id});
      await comment.updateOne({$push: {"replies": req.body }});
      res.status(200).json({status:"The comment has been updated with a reply", total: comment.replies.length + 1});
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;