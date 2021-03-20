const {body, validationResult} = require('express-validator');

module.exports.create = [
  body('title')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Video title can not be empty!')
    .bail(),
  body('author')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Invalid author!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];