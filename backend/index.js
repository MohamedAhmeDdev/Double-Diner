import express from "express";
import db from "./config/database.js";
import usersRoutes from "./routes/userRoute.js";
import loginRouters from "./routes/userLoginRoute.js";
import reservation from "./routes/resarvationRoute.js";
import menuRouters from "./routes/menuRoute.js"
import inventoryRouters from "./routes/InventoryRoute.js";
import staffRouters from "./routes/staffRoute.js"
import cors from "cors";
 
const app = express();
 
try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}
 
app.use(cors());
app.use(express.json());
app.use('/useraccount', usersRoutes);
app.use('/login', loginRouters);
app.use('/reservation', reservation);
app.use('/menu', menuRouters);
app.use('/inventory', inventoryRouters);
app.use('/staff', staffRouters);

 
app.listen(5000, () => console.log('Server running at port 5000'));
