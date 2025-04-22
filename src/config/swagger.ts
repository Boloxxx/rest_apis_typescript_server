import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)
const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://boloxdev.netlify.app/_next/image?url=%2Fprofile.png&w=640&q=75');
            height: 250px;
            width: auto;
        }
        .Swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: 'Documentacion REST API Express / TypeScript',
    customfavIcon: 'https://boloxdev.netlify.app/_next/image?url=%2Fprofile.png&w=640&q=75',
}
export default swaggerSpec
export { swaggerUiOptions };