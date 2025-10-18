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

// ✅ Connect to DB
connectDB();

// ✅ CORS should come first
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true, // allow sending cookies
  })
);

// ✅ Parse incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Parse cookies
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/image", uploadRouter);
app.use("/api/income", incomeRouter);
app.use("/api/home", dashRouter);
app.use("/api/expense", expenseRouter);

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
  console.log("CORS enabled for:", "http://localhost:5173");
});
