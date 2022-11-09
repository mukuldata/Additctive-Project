const express = require("express");
const app = express();
const router = express.Router();
const Post = require("../models/Post");



//get back all the post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

//submits a post
router.post("/",async (req, res) => {
      const post = new Post({
        name: req.body.name,
        dob: req.body.dob,
        country:req.body.country,
        resume:req.body.resume
        });
      try {
        const savedpost = await post.save();
        res.json(savedpost);
        
      } catch (err) {
        res.json({ message: err });
        console.log(err);
      }
    }
);


//delete post
router.delete("/:postid", async (req, res) => {
  try {
    const removedpost = await Post.remove({ _id: req.params.postid });
    res.json(removedpost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
