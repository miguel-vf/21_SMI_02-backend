const Video = require('../models').Video;
const path = require('path');

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
    const video = await Video.findByPk( req.params.id );
    if (video) {
        res.status(200).json(video);
    }
    else {
        res.status(404).end();
    }
};

// Upload file to an existing video
module.exports.upload = async (req, res, next) => {
    try {
        const video = await Video.findByPk( req.params.id );
        if (!video) {
            res.status(404).end();
            return;
        }

        // Move file
        const videoFile = req.files.videoFile;
        const extension = path.extname(videoFile.name);
        const destination = '/videos/video-' + video.id + extension;
        videoFile.mv(destination);

        // Update video
        await video.update({ file: destination });
        res.status(200).json(video);
    }
    catch (error) {
        return next(error);
    }
};