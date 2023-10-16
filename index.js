import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
// import bodyParser from "body-parser";
import path from "path";

//securty packges
import helmet from "helmet";
import dbConnection from "./dbConfig/index.js";
import errorMiddleware from "./middleware/errorMddleWear.js";
import router from "./routes/index.js";

const __dirname = path.resolve(path.dirname(""));

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "views/build")));

const PORT = process.env.PORT || 8800;

dbConnection();

app.use(helmet());
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
app.use(express.json({ limit: "10mb" })); // Request body parsing middleware
app.use(express.urlencoded({ extended: true })); // Request body parsing middleware
app.use(router); // Route handling middleware
// app.use(express.json({limit: "10mb"}));
app.use(morgan("dev"));
//error middleware
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
