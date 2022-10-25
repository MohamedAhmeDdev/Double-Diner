const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
const database = require('./config/dbConfig')
const menuRouter = require('./routes/menuRoute.js')
const userRouter = require('./routes/userRoute.js')
const reservationRouter = require('./routes/resarvationRoute.js')
const inventoryRouter = require('./routes/InventoryRoute.js')
const staffRouter = require('./routes/staffRoute.js')
const orderRouter = require('./routes/OrderRoute.js')
const orderItemsRouter = require('./routes/OrersItemRoute.js')
const FeedbackRouter = require('./routes/FeedbackRoute.js')


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
app.use('/reservation', reservationRouter)
app.use('/inventory', inventoryRouter)
app.use('/staff', staffRouter)
app.use('/order', orderRouter)
app.use('/orderItems', orderItemsRouter)
app.use('/feedback', FeedbackRouter)


 
app.listen(5000, () => console.log('Server running at port 5000'));