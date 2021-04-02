const app = require('./app/app');

//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');


// Listening port
const port = process.env.PORT || 3000;
/*
// API documentation
if (process.env.NODE_ENV === "development") {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
*/
app.listen(port, () => {
    console.log(`Service listening at port ${port}`);
});

