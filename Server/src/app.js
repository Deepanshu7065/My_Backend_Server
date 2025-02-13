import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from 'body-parser'
import authenticate from "./middlewares/authenticat.js";


const app = express();
app.use(morgan("dev"));

app.use(cors());
app.use(express.text());

app.use("/uploads", express.static("uploads"));

app.use(bodyParser.json());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(urlencoded({ extended: true, limit: "50mb" }));

export default app;