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