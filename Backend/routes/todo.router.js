const express = require('express')
const TodoModel = require('../model/todo.model')
const TodoRouter = express.Router()

TodoRouter.post('/add-todo' , async(req,res)=>{
    try {
        const todo = new TodoModel(req.body)
        await todo.save()
        res.status(200).json({todo})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Add Todo Error"})
    }
})

TodoRouter.get('/read-todo' , async(req,res)=>{
    try {
        const todos = await TodoModel.find()
        res.status(200).json({message:todos})
    } catch (error) {
        console.log(error)
        res.status(500).json("Read Error")
    }
})

TodoRouter.delete('/delete-todo/:id' , async(req,res)=>{
    try {
        const {id} = req.params

        const user = await TodoModel.findById(id)

        if(!user){
            return res.status(400).json({message:"No User Found"})
        }

        await TodoModel.findByIdAndDelete(id)
        res.status(200).json({message: "Todo Deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Delete Error"})
    }
})

module.exports =  TodoRouter