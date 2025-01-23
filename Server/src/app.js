import express, { urlencoded } from "express";
import cors from "cors";


const app = express();


app.use(cors())

app.use(express.json({
    limit: "50mb",
    extended: true
}));

app.use(urlencoded({
    extended: true,
    limit: "50mb"
}));



export default app