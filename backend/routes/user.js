const express = require ("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup",(req,res,next)=>{
    
    //if username is occupied
    User.find({username : req.body.username}).then(document=>{
        if (document){
            res.status(401).json({
                message: "Username is used, try another one",
                douplicates: true
            });
        }
    });

    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user = new User({
            username:req.body.username,
            password:hash
          });
          //save to db
          user.save().then(createdUser => {
            // send back to angular side
            res.status(201).json({
              message: "User added successfully",
              userId: createdUser._id
            });
          })
          .catch(err=>{
              res.status(500).json({
                  error:err
              });
          });
      });
});
    

router.post("/login", (req, res, next) => {
    var fetchedUser;
    User.findOne({username:req.body.username}).then(user => {
        
        if (!user){
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        fetchedUser = user;
        // console.log(req.body.password + " " + user.password);
        return bcrypt.compare(req.body.password,user.password);
    })
    .then(result=>{
        //if auth is wrong
        if (!result){
            return res.status(401).json({
                message: "Auth denied"
            });
        }
        //if auth is right
        const token = jwt.sign(
            {username:fetchedUser.username, id: fetchedUser._id},
            "secret_this_should_be_longer",
            { expiresIn : "1h" }
        );
        res.status(201).json({
            token: token,
            expiresIn: 3600
    });        
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Auth failed"
        });
    });
});


router.get("/getUsers", (req,res,next)=>{
    User.find().then(documents=>{
        res.status(201).json({
            users: documents
        });
    });
});

module.exports = router;