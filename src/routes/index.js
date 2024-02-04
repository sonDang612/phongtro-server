import authRouter from "./auth";
const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);

  return app.use("/", (req, res) => {
    console.log("server on...");
  });
};

export default initRoutes;
