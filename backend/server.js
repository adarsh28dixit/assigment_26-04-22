import express from "express";
import mongoose from "mongoose";

import userRouter from "./routers/userRouter.js";

const app = express();

app.use(express.json())

mongoose.connect('mongodb://localhost/try', {
    useUnifiedTopology: true,
    useNewUrlParser : true,
})


app.use('/api', userRouter)

app.use((req, res) => {
    res.send("Server is ready adarsh bhai")
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
