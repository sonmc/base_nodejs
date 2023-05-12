import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import mainRouter from "./routes";
import cookieParser from "cookie-parser";

require("dotenv").config();

const app = express();
createConnection()
  .then(async () => {
    app.use(express.json());
    app.use(cookieParser());
    app.use("/api", mainRouter);
    app.listen(3000, () => console.log("server running on port 3000"));
  })
  .catch((error) => console.log(error));
