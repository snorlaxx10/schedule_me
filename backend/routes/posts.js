const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// Create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted.");
    } else {
      res.status(403).json("You can only delete your post.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    //const posts = await Post.find();

    //adds a new field which is the userId of a post converted into an objectId
    //performs the equivalent of a left join to find users of a post
    //filters to only include the user's name
    //it may be easier to add some fields directly to the post model in the future
    const posts = await Post.aggregate([
      {
        $addFields: {
          userObjId: {
            $toObjectId: "$userId",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userObjId",
          foreignField: "_id",
          as: "user_info",
        },
      },
      {
        $unwind: "$user_info",
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          // "user_info._id":0,
          "user_info.email": 0,
          "user_info.password": 0,
          "user_info.profilePicture": 0,
          "user_info.createdAt": 0,
          "user_info.updatedAt": 0,
          "user_info.__v": 0,
        },
      },
    ]);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*
    The left join remains or else 
    user data is lost in a an agreggate query
 */
router.get("/popular", async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $addFields: {
          userObjId: {
            $toObjectId: "$userId",
          },
          likeCount: { $size: "$likes" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userObjId",
          foreignField: "_id",
          as: "user_info",
        },
      },
      {
        $unwind: "$user_info",
      },
      {
        $sort: { likeCount: -1 },
      },
      {
        $project: {
          // "user_info._id":0,
          "user_info.email": 0,
          "user_info.password": 0,
          "user_info.profilePicture": 0,
          "user_info.createdAt": 0,
          "user_info.updatedAt": 0,
          "user_info.__v": 0,
          likeCount: 0,
        },
      },
    ]);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res
        .status(200)
        .json({
          status: "The post has been liked",
          total: post.likes.length + 1,
        });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res
        .status(200)
        .json({
          status: "The post has been disliked",
          total: post.likes.length - 1,
        });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id for all posts from specific user
router.get("/:id", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update comment section of post
router.put("/:id/comment", async (req, res) => {
  try {
    const post = await Post.updateOne(
      { _id: req.params.id },
      { $set: { comments: req.body } }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//return comment section of post
router.get("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
