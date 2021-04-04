const {param, body, validationResult} = require('express-validator');
const jwt = require('express-jwt');
const auth = require('../../config/auth.config');
const path = require('path');

module.exports.create = [
  jwt({ secret: auth.secret, algorithms: [ auth.algorithm ] }),
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

module.exports.upload = [
  jwt({ secret: auth.secret, algorithms: [ auth.algorithm ] }),
  param('id', 'missing video id')
    .exists()
    .isNumeric()
    .bail(),
  body('videoFile', 'Please upload video file!')
    .custom((value, { req }) => {
      const extension = (path.extname(req.files.videoFile.name)).toLowerCase();
      switch (extension) {
        case '.mp4':
          return '.mp4';
        default:
          return false;
      }
    })
    .bail(),
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
  },
];