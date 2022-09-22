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
        description: 'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales mi ac odio porta cursus. Suspendisse sit amet pharetra ipsum. Sed aliquet ornare ex et bibendum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean euismod sem consectetur justo tincidunt consequat. Nulla non odio sit amet mauris facilisis tristique. Praesent volutpat posuere ipsum, id vestibulum tellus sollicitudin a. Nulla malesuada sodales laoreet. Nulla aliquet erat in mi sollicitudin, at placerat turpis dictum. Etiam in lobortis arcu, at gravida dolor. Nulla maximus blandit augue eu malesuada. Donec viverra commodo augue, vel dignissim lacus lobortis id.'
      },
      servers: [
        {
          url: "http://localhost:8080",
          description: "Local server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
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

