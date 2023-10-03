import express from "express"
import dotenv from "dotenv";
import cors from 'cors';
import morgan from "morgan";
import bodyParser from "body-parser";

//security packages
import helmet from "helmet";
import dbConnection from "./dbConfig/index.js";
import errorMiddleWare from "./middleware/errorMddleWear.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();

const PORT = process.env.port || 8800;

dbConnection();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended:true}));

app.use(morgan("dev"));
app.use(router);
//error middleware
app.use(errorMiddleWare)

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})