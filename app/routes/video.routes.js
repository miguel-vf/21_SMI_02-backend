module.exports = (app) => {
    const controller = require("../controllers/video.controller.js");
    const validator = require('../middlewares/validators/video.validator');
    const baseRoute = '/videos';

    app.get(baseRoute, controller.getAll);
    app.post(baseRoute, validator.create, controller.create);
}