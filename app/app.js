const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();

// Avoid issues with CORS
app.use(cors());

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type: multipart/form-data
app.use(fileUpload({ createParentPath: true }));

// Synchronize models with the database
const db = require("./models");
db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('This is an API to a video page');
});

require('./routes/video.routes')(app);
require("./routes/auth.routes.js")(app);

module.exports = app;
