//const videoRoutes = require("../routes/video.routes.js");

const videos = [
    //{ id: 1, title: 'Video title', author: 'Someone'}
];

module.exports.create = (data) => {
    const id = videos.length + 1;
    //const author = user.username;
    const video = { id: id, title: data.title, author: data.author};
    videos.push(video);
    return Promise.resolve(video);
}

module.exports.findAll = () => {
    return Promise.resolve(videos)
}

module.exports.findById = (id) => {
    const video = videos.find(video => video.id == id);
    return Promise.resolve(video);
}

module.exports.drop = () => {
    videos.length = 0;
    return Promise.resolve();
}