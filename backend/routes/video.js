const express = require("express");
const Video = require('../models/video');
const router = express.Router();
const init = require("../middleware/seeder");

router.get("",init,(req,res,next)=>{
    Video.find().then((videos)=>{
        // console.log(videos);
        if (!videos){
            res.status(404).json({
                message: "Videos not found"
            });
        }
        //successfully
        res.status(200).json({
            videos:videos
        });
    }).catch(err=>{
        res.status(401).json({
            message: err
        });
    });
});

router.post("/getVideo", (req,res,next)=>{
    Video.findById(req.body.id).then(video=>{
        if (!video){
            res.status(404).json({
                message: "Video not found"
            });
        }

        res.status(200).json({
            message:"video found!",
            video: video
        });

    }).catch(err=>{
        res.status(401).json({
            message:err
        });
    });
});

router.post("/getVideoId", (req,res,next)=>{
    Video.find().then(videos=>{
        if (!videos){
            res.status(404).json({
                message: "Videos not found"
            });
        }
        //successfully
        res.status(200).json({
            videos:videos
        });
    }).catch(err=>{
        res.status(401).json({
            message: err
        });
    });
});


module.exports = router;
