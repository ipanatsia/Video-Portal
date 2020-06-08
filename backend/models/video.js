const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    name: { type:String },
    description : { type:String },
    url : String,
    ratings: []
});

module.exports = mongoose.model("Video",videoSchema);