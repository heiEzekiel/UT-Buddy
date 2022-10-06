const { Router } = require("express");
const db = require("../database");
const auth = require("../middleware/auth.js");
const Tips = require("../models/tips.js");
const User = require("../models/user.js");

const router = Router();
router.use(auth);
router.get("/", async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await Todo.find({ "userId" : userId });
    console.log(result)

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
});

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

router.post("/todo", async (req, res) => {
  const { text } = req.body;

  try {
    const result = await db
      .promise()
      .query(`Select * from list where text like '%${text}%'`);
    result[0].map((task) => {
      let old_date = task.day.toString();
      const date = old_date.substr(0, 10);
      task.day = date;

      return task;
    });
    res.status(200).send(result[0]);
  } catch (err) {
    console.log(err);
    res.status(404).send("Not found");
  }
});

router.post("/date", async (req, res) => {
  const { min, max } = req.body;

  try {
    const result = await db
      .promise()
      .query(`select * from list where day >= '${min}' and day <= '${max}'`);
    result[0].map((task) => {
      let old_date = task.day.toString();
      const date = old_date.substr(0, 10);
      task.day = date;

      return task;
    });
    res.status(200).send(result[0]);
  } catch (err) {
    console.log(err);
    res.status(404).send("Not found");
  }
});

module.exports = router;
