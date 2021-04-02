const userModel = require('../models/user.model.js');
const Video = require('../models/video.model.js');

module.exports.getAll = async (req, res, next) =>{
    const videos = await Video.findAll();
    res.status(200).json(videos);
}

module.exports.create = async (req, res, next) => {
    const video = await Video.create( { title: req.body.title, author: req.body.author } );
    res.status(201).json(video);
}

// Get an existing video
module.exports.get = async (req, res, next) => {
    // No validation needed
    const video = await Video.findById( req.params.id );
    if (video) {
        res.status(200).json(video);
    }
    else {
        res.status(404).end();
    }
};