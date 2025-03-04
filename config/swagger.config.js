const swaggerJsDoc = require('swagger-jsdoc');
const { port } = require('./env');
const { routes } = require('../app');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant Table Booking API',
      version: '1.0.0',
      description: 'API documentation for the Restaurant Table Booking System',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development Server',
      },
    ],
  },
  apis:["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;

