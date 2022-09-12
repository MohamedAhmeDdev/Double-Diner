const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
const database = require('./config/dbConfig')
const menuRouter = require('./routes/menuRoute.js')
const userRouter = require('./routes/userRoute.js')
const loginRouter = require('./routes/userLoginRoute.js')
const reservationRouter = require('./routes/resarvationRoute.js')
const inventoryRouter = require('./routes/InventoryRoute.js')
const staffRouter = require('./routes/staffRoute.js')


try {
    database.authenticate();
    console.log('you are connected to the database...');
} catch (error) {
    console.error('Connection error:', error);
}



app.use(cors());

//static Images Folder
app.use('/Images', express.static('./Images'))

app.use('/menu', menuRouter)
app.use('/useraccount', userRouter)
app.use('/login', loginRouter)
app.use('/reservation', reservationRouter)
app.use('/inventory', inventoryRouter)
app.use('/staff', staffRouter)


 
app.listen(5000, () => console.log('Server running at port 5000'));