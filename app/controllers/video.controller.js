const Video = require('../models').Video;
const path = require('path');

const encoding = require('../media/encoding');

module.exports.getAll = async (req, res, next) =>{
    const videos = await Video.findAll();
    res.status(200).json(videos);
}

module.exports.create = async (req, res, next) => {
    const video = await Video.create( { title: req.body.title, author: req.body.author, description: req.body.description } );
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

// Upload video file to an existing video
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
        const videoFilename = 'video-' + video.id;
        const localFile = '/uploads/' + videoFilename + extension;
        videoFile.mv(localFile);
        
        const outputFile = await encoding.normalize(localFile);
        

        // Update video
        await video.update({ file: outputFile });

        const thumbFile = req.files.videoFile;
        const extensionT = path.extname(thumbFile.name);
        const thumbFilename = 'video-' + video.id;
        const localFileT = '/uploads/' + thumbFilename + extensionT;
        thumbFile.mv(localFileT);
        
        const outputFileT = await encoding.createThumbnail(localFileT);

        await video.update({ thumbnail: outputFileT });

        res.status(200).json(video);
    }
    catch (error) {
        return next(error);
    }
};

// Upload thumbnail to an existing video
module.exports.uploadThumb = async (req, res, next) => {
    try {
        const video = await Video.findByPk( req.params.id );
        if (!video) {
            res.status(404).end();
            return;
        }

        // Move file
        const thumbFile = req.files.thumbFile;
        const outFile = await encoding.normalize(thumbFile.name);
        //const extension = path.extname(videoFile.name);     // 
        const extension = path.extname(outFile);
        const destination = '/images/video-' + video.id + extension;
        thumbFile.mv(destination);

        // Update thumbnail
        await video.update({ thumbnail: destination });
        res.status(200).json(video);
    }
    catch (error) {
        return next(error);
    }
};