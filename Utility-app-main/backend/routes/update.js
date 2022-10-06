const { Router } = require("express");

const auth = require("../middleware/auth.js");
const User = require("../models/user.js");
const router = Router();

router.use(auth);

/* router.post("/", async (req, res)=>{
    const { id, text, day, reminder } = req.body;
    console.log(day)
    try {
        const result = await Todo.findOneAndUpdate({ "_id": id }, { "$set": { text: text, day: day, reminder: reminder } })
        console.log(result)
        res.status(200).json({message: "Successfully updated"})
        
        
    } catch(err){
        console.log(err)
    }
}) */

router.post("/profile", async (req, res)=>{
    const { userId, name, address, zip } = req.body;
    
    try {
        
        const filter = { "_id":userId };
        const update = { name, address, zip };
        let result = await User.findOneAndUpdate(filter, update);
        
        res.status(200).json({message: "Successfully updated"})
        
        
    } catch(err){
        res.status(500).json({ message: "Something went wrong." });
    }
})

router.post("/profile/occupation", async (req, res)=>{
    const { userId, occupation } = req.body;
    
    try {
        
        const filter = { "_id":userId };
        const update = { occupation };
        let result = await User.findOneAndUpdate(filter, update);
        
        res.status(200).json({message: "Successfully updated"})
        
        
    } catch(err){
        res.status(500).json({ message: "Something went wrong." });
    }
})





module.exports = router