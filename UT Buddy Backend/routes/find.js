const { Router } = require("express");
const db = require("../database");
const auth = require("../middleware/auth.js");
const Tips = require("../models/tips.js");
const User = require("../models/user.js");
const Post = require("../models/post.js");

const router = Router();
router.use(auth);


router.get("/tips", async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await Tips.find({ "userId" : userId });
    console.log(result)

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
});

router.get("/profile", async (req, res) => {
  const { userId } = req.body;
  try {
    
    const result = await User.find({ "_id" : userId });
    console.log(result)

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({message: "Something went wrong"});
  }
});

router.post("/special", async (req, res) => {
  const { userId, id } = req.body;
  try {
    
    const result = await User.find({ "_id" : id });
    console.log(result)

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({message: "Something went wrong"});
  }
});

router.post("/special/tips", async (req, res) => {
  const { userId, id } = req.body;
  try {
    
    const result = await Tips.find({ "userId" : id });
    console.log(result)

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({message: "Something went wrong"});
  }
});

router.get("/post", async (req, res) => {
  const { userId } = req.body;
  try {
    
    const result = await Post.find();
    const extracted = result.slice()
    var final_result = []
    for (var data of extracted){
      if (data.userId == userId){
        data.isUser = true;
      } else {
        data.isUser = false;
      }
      
      final_result.push({thread: data.post, username: data.username, replies: String(data.replies), id: data.userId, isUser: data.isUser, post_id: data._id})
      console.log(final_result)
    }
    

    res.status(200).send(final_result);
  } catch (err) {
    console.log(err)
    res.status(500).json({message: "Something went wrong"});
  }
});

module.exports = router;
