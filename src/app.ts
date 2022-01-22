import express from "express";
import { pinoConfig } from "./logger/pino";
import PinoHttp from "pino-http";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(PinoHttp({ logger: pinoConfig }));

app.use("/", router);

export { app };