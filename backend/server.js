const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
const router = require('./routes/productRouter.js')


app.use(cors());

//static Images Folder
app.use('/Images', express.static('./Images'))

app.use('/menu', router)
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})