const Video = require("../models/video");


module.exports = (req,res,next)=>{
    try{
        Video.find().then(videos =>{
            // console.log(videos);
            if (videos){
                console.log("Videos already populated");
            }else{
                console.log("Begin seeding");
                const videos = [
                    {
                        name: "React JS Crash Course",
                        description: "In this crash course you will learn what React JS is and the fundamentals such as components, state, props, JSX, events, etc.",
                        url: "https://www.youtube.com/embed/sBws8MSXN7A",
                        ratings:[1,5,5,4,3,4,2,5]
                    },
                    {
                        name:"Google Cardboard: Assembly",
                        description:"A short instruction video on how to build the Google cardboard headset from a generic kit. It takes about 2 minutes from start to finish and for something made of cardboard, it looks great and is surprisingly sturdy.",
                        url: "https://www.youtube.com/embed/5mSW5GyFozg",
                        ratings:[4,5,5,5,3,5,4,5]
                    },
                    {
                        name:"How Does AngularJS Work Beginners Angular Tutorial",
                        description:"What you will learn in this course. How to use Angular.js to save time, create better projects and give your users a better experience. We’ll create a full SPA from scratch (client side). How to cloud-enable your SPA so that you can connect it to any kind of backend. Fully commented source code of the course project. Learn how to architecture a SPA: modules, controllers, services Learn how to add URL routes to your client-side SPA. We’ll be using Angular.js version 1.3.2. Access live examples at the end of each coding lesson. Learn how to use other great tools such as Boostrap 3, UnderscoreJS and Google Chrome’s Developer Tools!",
                        url:"https://www.youtube.com/embed/nmFaZ6dVkt4",
                        ratings:[2,4,2,2,3,1,2,5]
                    },
                    {
                        name:"How Node.js Works | Mosh",
                        description:"New to Node.js? Check out this video that explains \"How does Node work?\"",
                        url:"https://www.youtube.com/embed/jOupHNvDIq8",
                        ratings:[3,3,3,3,3,3,3,3]
                    },
                    {
                        name:"iPhone 7 Trailer 2016",
                        description:"iPhone 7 concept trailer 2016! with Bluetooth AirPods by Beats and ChargingPad, and much more!",
                        url:"https://www.youtube.com/embed/ZdJ7zga2yGg",
                        ratings:[4,3,4,3,4,3,4,3]
                    },
                    {
                        name:"What is the MEAN Stack",
                        description:"Do you know what the MEAN stack is? Watch our short intro video and get ready to kick your learning into shape with this full-stack development toolkit. Then head on over and play through our MEAN-related courses now.",
                        url:"https://www.youtube.com/embed/IRF7kCp51Bk",
                        ratings:[1,5,5,5,3,4,5,5]
                    }
                ];
                for (let i=0; i<videos.length; i++){
                    const video = new Video({
                        name: videos[i].name,
                        description:videos[i].description,
                        url:videos[i].url,
                        ratings:videos[i].ratings
                    });
                    //save to DB
                    video.save().then(createVideo=>{
                        if (!createVideo){
                            console.log("Problema!!");
                        }
                        res.status(201).json({
                            message:"video added!",
                            videoId: createVideo._id
                        });
                        
                    });
                }
            }            
        });
        next();         
    }catch(err){
        res.status(404).json({
            message:err
        });
    }
};