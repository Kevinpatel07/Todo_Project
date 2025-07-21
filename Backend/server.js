const express = require('express')
const connectDB = require('./config/todo.config')
const TodoRouter = require('./routes/todo.router')
const App = express()
require("dotenv").config()
const cors = require('cors');

connectDB()
App.use(cors());
App.use(express.json())
App.use('/todos' , TodoRouter)

PORT = 7999
App.listen(PORT, ()=>{
    console.log(`Server connected on http://localhost:${PORT}` )
})