import type { SwaggerOptions } from "swagger-ui-express";

const swaggerDefinition: SwaggerOptions['swaggerDefinition'] = {
    openapi: '3.0.0',
    info: {
        version: '1.0',
        title: 'XP Tracker API',
        description: 'Complete API documentation',
    },
    servers: [
        {
            url: process.env.VUE_APP_BASE_URL,
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Enter JWT token in the format: Bearer <token>',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

export const swaggerOptions = {
    swaggerDefinition,
    apis: [
        './src/swagger/*.ts',
    ],
};
