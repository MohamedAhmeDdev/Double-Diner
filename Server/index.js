const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const database = require("./config/dbConfig");
const AuthRouter = require("./routes/Auth.route");
const DishesRouter = require("./routes/Dishes.route");
const OrdersRouter = require("./routes/Orders.route");

//Admin
const AdminOrdersRouter = require("./routes/admin_orders.route");
const AdminUsersRouter = require("./routes/admin_customers.route");

try {
  database.authenticate();
  console.log("you are connected to the database...");
} catch (error) {
  console.error("Connection error:", error);
}

app.use(cors());

//static Images Folder
app.use("/Images", express.static("./Images"));

app.use("/auth", AuthRouter);

//user api routes
app.use("/dishes", DishesRouter);
app.use("/orders", OrdersRouter);

//Admin api routes
app.use("/admin/orders", AdminOrdersRouter);
app.use("/admin/users", AdminUsersRouter);

app.listen(5000, () => console.log("Server running at port 5000"));
