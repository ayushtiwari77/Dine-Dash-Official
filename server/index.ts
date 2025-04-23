import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";

dotenv.config();
const port: any = process.env.PORT || 3000;

const app = express();

const DIRNAME = path.resolve();

//default middleware for any Mern Project
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "https://dinedashofficial.netlify.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

app.listen(port, () => {
  connectDB();
  console.log(`server started on port ${port}`);
});
