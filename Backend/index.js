const express = require("express");

const app = express();

const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT;

const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./configuration/db.js");

const authRoute = require("./routers/authRouter.js");

const userRoute = require("./routers/userRouter.js");

const uploadRouter = require("./routers/uploadImage.js");

const expenseRouter = require("./routers/expenseRouter.js");

const incomeRouter = require("./routers/incomeRouter.js");

const dashRouter = require("./routers/dashboardRouter.js");


app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true               
}));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use("/api/image", uploadRouter);

app.use("/api/income", incomeRouter);

app.use("/api/home", dashRouter);

app.use("/api/expense", expenseRouter);




app.listen(port , ()=>{
    connectDB();
    console.log(`This server is running on : http://localhost:${port}`);
})