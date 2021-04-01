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
    const video = await Video.findByPk( req.params.id );
    if (video) {
        res.status(200).json(video);
    }
    else {
        res.status(404).end(); // not found 
    }
};

// Upload cover image to an existing video
module.exports.upload = async (req, res, next) => {
    try {
        const video = await Video.findByPk( req.params.id );
        if (!video) {
            res.status(404).end();
            return;
        }

        // Move cover file
        const coverFile = req.files.coverFile;
        const extension = path.extname(coverFile.name);
        const destination = '/covers/cover-' + book.id + extension;
        coverFile.mv(destination);

        // Update video
        await video.update({ cover: destination });
        res.status(200).json(video);
    }
    catch (error) {
        return next(error);
    }
};