const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API 文档',
            version: '1.0.0'
        }
    },
    apis: ['./routes/*.js']
};

app.use('/api-docs', 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerJsDoc(swaggerOptions))
); 