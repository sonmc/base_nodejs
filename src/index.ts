import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import mainRouter from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";

import expressListEndpoints from "express-list-endpoints";
import { getAllRouter } from "util/router.util";
import permService from "services/perm.service";
import dataSource from "infrastructure/config/data-source";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

createConnection(dataSource)
  .then(async () => {
    app.use(mainRouter);
    const capturedRoutes = expressListEndpoints(app);
    const routers = getAllRouter(capturedRoutes);
    permService.updateFromRouter(routers);
    console.log(routers);
  })
  .catch((error) => console.log(error));
app.listen(5000, "0.0.0.0", () => console.log("server running on port 5000"));
