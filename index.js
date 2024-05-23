const express = require('express')
const { connection } = require('./config/db')
const { UserRouter } = require('./routes/UserRoute')
const { PostRouter } = require('./routes/PostRoute')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use("/users",UserRouter)
app.use("/posts",PostRouter)

app.get("/", (req, res) => {
    res.send('WelCome to Varlyq')
})




app.listen(8200, async () => {

    try {
        await connection
        console.log("Connected to DB")
    } catch (err) {
        console.log('Unable to Connect')
    }

    console.log(`Server running on 8200`)
})
