import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import authenticate from "./middlewares/authenticat.js";
import productsRoutes from "./routes/products.js";
import imageRoutes from "./routes/ImageUplods.js";
import imageGetRoutes from "./routes/imageGet.js"
import UserRoutes from "./routes/UserApi.js"
import LoginRoutes from "./routes/login.js"
import VerifyRoutes from "./routes/VerifyToken.js"

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/v1", LoginRoutes);
app.use("/api/v1", VerifyRoutes);

app.use("/api/v1", imageGetRoutes)
app.use("/api/v1", authenticate, productsRoutes);
app.use("/api/v1", authenticate, imageRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/v1", authenticate, UserRoutes);


app.use(bodyParser.json());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(urlencoded({ extended: true, limit: "50mb" }));

export default app;
