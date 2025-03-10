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
import userGetRoutes from "./routes/UserGetAndUpdate.js"
import uploadsRepairs from "./routes/UploadDetailsForRepair.js"
import AddToCart from "./routes/AddCartApi.js"
import orderCreateRoutes from "./routes/AddOrdersApi.js"
import ContactApi from "./routes/contactApi.js"

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/v1", LoginRoutes);
app.use("/api/v1", VerifyRoutes);

app.use("/api/v1", imageGetRoutes)
app.use("/api/v1", productsRoutes);
app.use("/api/v1", UserRoutes);
app.use("/api/v1", AddToCart)

app.use("/api/v1", authenticate, orderCreateRoutes)
app.use("/api/v1", authenticate, userGetRoutes)
app.use("/api/v1", authenticate, imageRoutes);
app.use("/api/v1", authenticate, uploadsRepairs);
app.use("/api/v1", authenticate, ContactApi)
app.use("/uploads", express.static("uploads"));


app.use(bodyParser.json());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(urlencoded({ extended: true, limit: "50mb" }));

export default app;
