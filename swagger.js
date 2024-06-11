// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Forum APP API",
      description: "Ini dokumentasi api forum app",
      contact: {
        name: "gweh bang",
      },
      servers: ["http://localhost:3000"],
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "Bearer",
          BearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // add all files that contain swagger annotations here
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
