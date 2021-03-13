module.exports = app => {
    const controller = require("../controllers/auth.controller");
    const validator = require('../middlewares/validators/user.validator');

    app.post('/signup', validator.validateUser, controller.signup);
    app.post('/login', validator.validateLogin, controller.login);
};