module.exports = (app) => {
    const controller = require("../controllers/video.controller.js");
    const validator = require('../middlewares/validators/video.validator');
    const baseRoute = '/videos';

    app.get(baseRoute, controller.getAll);
    app.post(baseRoute, validator.create, controller.create);
    app.get(`${baseRoute}/:id`, controller.get);
    app.post(`${baseRoute}/:id/upload`, validator.upload, controller.upload);
<<<<<<< HEAD
=======
    app.post(`${baseRoute}/:id/upload/thumbnail`, validator.uploadThumb, controller.uploadThumb);
>>>>>>> old-project-state
}