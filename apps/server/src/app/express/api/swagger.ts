import swaggerAutogen from "swagger-autogen";

export const swaggerRun = () => {
  swaggerAutogen()(
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
