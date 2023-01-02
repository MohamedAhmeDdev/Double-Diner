const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const database = require("./config/dbConfig");
const AuthRouter = require("./routes/Auth.route");
const DishesRouter = require("./routes/Dishes.route");

try {
  database.authenticate();
  console.log("you are connected to the database...");
} catch (error) {
  console.error("Connection error:", error);
}

app.use(cors());

//static Images Folder
app.use("/Images", express.static("./Images"));

//Routes
app.use("/auth", AuthRouter);
app.use("/dishes", DishesRouter);

app.listen(5000, () => console.log("Server running at port 5000"));
