import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const dotenv = require("dotenv");
dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API thông tin mô tả",
    },
    servers: [
      {
        url: `${process.env.BASE_URL_SERVER}`,
        description: "My API Documentation",
      },
    ],
  },
  apis: [`${__dirname}/routes/*.js`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;