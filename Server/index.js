const express = require("express");
const cors = require("cors");
const morgan = require("morgan");  //routing and middleware

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const database = require("./config/dbConfig");
const AuthRouter = require("./routes/Auth.route");
const DishesRouter = require("./routes/Dishes.route");
const OrdersRouter = require("./routes/Orders.route");
const ReservationRouter = require("./routes/ReservationRoute");

//Admin
const AdminOrdersRouter = require("./routes/admin_orders.route");
const AdminUsersRouter = require("./routes/admin_customers.route");
const AdminDishesRouter = require("./routes/admin_dishes.route");
const AdminReservationRouter = require("./routes/admin_reservation.route");
const AdminReportDishRouter = require("./routes/report/inventory.route");

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
app.use("/reservation", ReservationRouter);


//Admin api routes
app.use("/admin/orders", AdminOrdersRouter);
app.use("/admin/users", AdminUsersRouter);
app.use("/admin/dishes", AdminDishesRouter);
app.use("/admin/reservation", AdminReservationRouter);
app.use("/admin/report/dish", AdminReportDishRouter);

app.listen(5000, () => console.log("Server running at port 5000"));
