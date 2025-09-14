const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");
const morgan = require("morgan")
const cookieParser = require("cookie-parser");

const DBconnnect = require("./Database/DB_connect");

const userRouter = require("./routes/userRouter");
const driverRouter = require("./routes/driverRouter");
const mapRouter = require("./routes/mapRouter");
const rideRouter = require("./routes/rideRouter");

DBconnnect(process.env.MONGO_URL);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/driver", driverRouter);
app.use("/maps", mapRouter);
app.use("/ride", rideRouter);
app.use("/images", express.static(path.join(__dirname, "public/images/uploads")));

const fs = require("fs");

const uploadPath = path.join(process.cwd(), "public/images/uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

app.get("/", (req, res) => {
  res.send("Hello From NeuraGO Backend");
});

module.exports = app; 