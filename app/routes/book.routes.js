module.exports = (app) => {
    const controller = require("../controllers/book.controller.js");
    const validator = require('../middlewares/validators/book.validator');
    const baseRoute = '/books';

    app.get(baseRoute, controller.getAll);
    app.post(baseRoute, validator.create, controller.create);
    app.get(`${baseRoute}/:id`, controller.get);
    app.post(`${baseRoute}/:id/upload`, validator.upload, controller.upload);
}
