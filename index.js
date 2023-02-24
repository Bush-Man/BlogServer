import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import AuthRoute from "./Routes/AuthRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import helmet from "helmet";

const app = express();

dotenv.config();

//middlewares
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected")).catch(err=>console.log(err))

app.listen(process.env.PORT || 5000, () => console.log(`Listening on port${process.env.PORT || 5000}`));


//routes
app.use("/auth", AuthRoute);
app.use("/post", PostRoute);

