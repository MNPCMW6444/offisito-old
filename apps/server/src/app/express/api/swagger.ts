import swaggerAutogen from "swagger-autogen";

export const swaggerRun = () => {
  swaggerAutogen({ openapi: "3.0.0" })(
    "swagger.json",
    ["apps/server/src/app/express/expressSetup.ts"],
    {
      info: {
        title: "Offisito API",
      },
      host: "localhost:5556/",
    },
  );
};
