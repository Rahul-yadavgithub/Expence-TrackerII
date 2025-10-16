const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./configuration/db.js");

const authRoute = require("./routers/authRouter.js");
const userRoute = require("./routers/userRouter.js");
const uploadRouter = require("./routers/uploadImage.js");
const expenseRouter = require("./routers/expenseRouter.js");
const incomeRouter = require("./routers/incomeRouter.js");
const dashRouter = require("./routers/dashboardRouter.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true                 // allow cookies/auth headers
}));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/image", uploadRouter);
app.use("/api/income", incomeRouter);
app.use("/api/home", dashRouter);
app.use("/api/expense", expenseRouter);

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
