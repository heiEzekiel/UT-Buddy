const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose");

const addRoute = require('./routes/add')
const delRoute = require('./routes/delete');
const findRoute = require('./routes/find')
const updateRoute = require('./routes/update')
const usersRoute = require('./routes/users');
const authRoute = require("./routes/middleware")
const stripeRoute = require("./routes/stripe")
const uploadRoute = require("./routes/upload")

const app = express();
app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '50mb' }))

app.use((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`)
    next()
})


app.use('/delete', delRoute)
app.use('/find', findRoute)
app.use('/add', addRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)
app.use('/update', updateRoute)
app.use('/stripe', stripeRoute)
app.use('/upload', uploadRoute)


const url = require("./database").url
mongoose.connect(url, {useUnifiedTopology: true,  useNewUrlParser: true});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})

app.listen(process.env.PORT || 4000, console.log("Running this app on 4000"))