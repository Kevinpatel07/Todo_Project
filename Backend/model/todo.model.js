const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    task:{type:String , required:true},
    isCompleted:{type:String , default:"False"}
})

const TodoModel = mongoose.model('todos' , TodoSchema)

module.exports = TodoModel