const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const path = require('path');

const PATH = path.normalize(path.dirname(require.main.filename) + '\\docs\\v1\\**\\*.yaml');
module.exports = (app, root) => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Conferance Moderator API Docs",
        version: '1.0.0',
        description: 'Description:'
      },
      servers: [
        {
          url: "http://localhost:8080",
          description: "Local server",
        },
      ],
      components: {
        securitySchemas: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: [PATH],
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
}

