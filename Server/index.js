const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/Images", express.static("./Images"));

// Database & Models configuration
const database = require("./config/dbConfig");
const Users = require("./models/User.model");
const Dishes = require("./models/Dishes.Model");
const Orders = require("./models/Orders.model");
const OrderDishes = require("./models/OrderDishes.model");
const Category = require("./models/Category.model");

// Define Core System Relationships
// 1. One-to-Many: Users <-> Orders
Users.hasMany(Orders, { foreignKey: "user_id", onDelete: "CASCADE" });
Orders.belongsTo(Users, { foreignKey: "user_id" });

// 2. Many-to-Many: Orders <-> Dishes via OrderDishes
Orders.belongsToMany(Dishes, { through: OrderDishes, foreignKey: "order_id", otherKey: "dish_id" });
Dishes.belongsToMany(Orders, { through: OrderDishes, foreignKey: "dish_id", otherKey: "order_id" });

// 3. Super Many-to-Many: Allowing direct querying via target models
Orders.hasMany(OrderDishes, { foreignKey: "order_id" });
OrderDishes.belongsTo(Orders, { foreignKey: "order_id" });

Dishes.hasMany(OrderDishes, { foreignKey: "dish_id" });
OrderDishes.belongsTo(Dishes, { foreignKey: "dish_id" });

Category.hasMany(Dishes, { foreignKey: "category_id" });
Dishes.belongsTo(Category, { foreignKey: "category_id" });

// Initialize Database Connection and Synchronize Tables Sequential order
async function initDatabase() {
  try {
    await database.authenticate();
    console.log("Connected to the database successfully...");
    
    // Sync all tables with relational constraints applied concurrently 
    await database.sync();
    console.log("All tables and relationships synced successfully!");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}
initDatabase();

// Routing Configurations
const AuthRouter = require("./routes/Auth.route");
const DishesRouter = require("./routes/Dishes.route");
const OrdersRouter = require("./routes/Orders.route");
const CategoryRouter = require("./routes/Category.route");

// Admin Routing Configurations
const AdminOrdersRouter = require("./routes/admin_orders.route");
const AdminUsersRouter = require("./routes/admin_customers.route");
const AdminCategoryRouter = require("./routes/admin_category");
const AdminDishesRouter = require("./routes/admin_dishes.route");
const AdminReportDishRouter = require("./routes/report/inventory.route");


// User Application Endpoints
app.use("/auth", AuthRouter);
app.use("/dishes", DishesRouter);
app.use("/orders", OrdersRouter);
app.use("/categories", CategoryRouter);

// Admin Application Endpoints
app.use("/admin/orders", AdminOrdersRouter);
app.use("/admin/users", AdminUsersRouter);
app.use("/admin/categories", AdminCategoryRouter);
app.use("/admin/dishes", AdminDishesRouter);
app.use("/admin/report/dish", AdminReportDishRouter);

app.listen(5000, () => console.log("Server running at port 5000"));
