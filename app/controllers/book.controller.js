const Book = require('../models').Book;
const path = require('path');

module.exports.getAll = async (req, res, next) => {
    const books = await Book.findAll();
    res.status(200).json(books);
}

module.exports.create = async (req, res, next) => {
    const book = await Book.create( { title: req.body.title, author: req.body.author } );
    res.status(201).json(book);
}

// Get an existing book
module.exports.get = async (req, res, next) => {
    // No validation needed
    const book = await Book.findByPk( req.params.id );
    if (book) {
        res.status(200).json(book);
    }
    else {
        res.status(404).end();
    }
};

// Upload cover image to an existing book
module.exports.upload = async (req, res, next) => {
    try {
        const book = await Book.findByPk( req.params.id );
        if (!book) {
            res.status(404).end();
            return;
        }

        // Move cover file
        const coverFile = req.files.coverFile;
        const extension = path.extname(coverFile.name);
        const destination = '/covers/cover-' + book.id + extension;
        coverFile.mv(destination);

        // Update book
        await book.update({ cover: destination });
        res.status(200).json(book);
    }
    catch (error) {
        return next(error);
    }
};
