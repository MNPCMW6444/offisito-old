import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Offisito Auth API',
    },
    host: 'localhost:5556/auth/sign'
};

const outputFile = './swagger-output.json';
const routes = ['src/app/express/auth/routers/signRouter.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);