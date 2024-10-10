import swaggerJsdoc from 'swagger-jsdoc';
import { env } from '../../env';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Text justifier API',
      version: '1.0.0',
      description: 'API documentation for the text justifier API app',
    },
    servers: [
      {
        url: env.APP_URL,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);
