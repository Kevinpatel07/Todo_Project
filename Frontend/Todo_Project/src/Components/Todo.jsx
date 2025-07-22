import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { CircleCheckBig } from 'lucide-react';

const BaseURL = "http://localhost:7999/todos"

const Todo = () => {
  const data = useRef("")
  const [todos, settodos] = useState([])
  const [isEditing, setisEditing] = useState(false)
  const [EditId, setEditId] = useState("")


  // Add Todo
  const handleADD = async () => {
    const todoText = data.current.value.trim()
    if (!todoText) return;

    const addTodo = await axios.post(`${BaseURL}/add-todo`, { task: todoText })
    settodos([...todos, addTodo.data])
    readTodo()
    data.current.value = ""
  }

  //  Read Todo
  const readTodo = async () => {
    const readtodo = await axios.get(`${BaseURL}/read-todo`)
    settodos(readtodo.data.message)
  }

  // Edit Todo
  const handleEdit = (id) => {
    const tododata = todos.find(item => item._id == id)
    setisEditing(true)
    data.current.value = tododata.task
    setEditId(id)
  }

  // Update Todo
  const handleUpdate = async (id) => {
    const todoText = data.current.value.trim()
    if (!todoText) return;

    const updateData = await axios.patch(`${BaseURL}/update-todo/${id}`, { task: todoText })
    settodos([...todos, updateData.data])
    readTodo()
    setisEditing(false)
    data.current.value = ""
  }

  // Checkbox

  const handleCheckbox = async (id, isCompleted) => {
    try {
      //  backend
      await axios.patch(`${BaseURL}/update-checkbox/${id}`, {isCompleted: !isCompleted })

      // Frontend
      settodos((prev) => prev.map((todo) => (
        todo._id === id ? { ...todo, isCompleted: !isCompleted } : todo
      )))
    } catch (error) {
      console.error("Failed to update", error);
    }
  }
  // Delete Todo
  const handleDelete = async (id) => {
    await axios.delete(`${BaseURL}/delete-todo/${id}`)
    readTodo()
  }

  useEffect(() => {
    readTodo()
  }, [])

  return (
    <div className='parent'>
      <div className='Todo'>
        <h1 className='To'>TO</h1>
        <h1 className='Do'>D<CircleCheckBig size={24} /></h1>
      </div>

      <div className='insert'>
        <input ref={data} type="text" placeholder='What do you need to do?' />
        {isEditing ? <button onClick={() => handleUpdate(EditId)}>Update</button> : <button onClick={handleADD}>ADD</button>}
      </div>

      <div>
        {todos.length === 0 ? " " : <div className='parentodo'>
          <table>
            <thead>
              <tr>
                <th>Checkbox</th>
                <th>Todo</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo._id}>
                  <td style={{ transform: "scale(1.2)" }}><input type="checkbox" checked={todo.isCompleted}
                    onChange={() => { handleCheckbox(todo._id, todo.isCompleted) }} /></td>
                  <td><h3 style={{textDecoration: todo.isCompleted ? 'line-through' : 'none'}}>{todo.task}</h3></td>
                  <td><button onClick={() => handleEdit(todo._id)} className='edit'>Edit</button></td>
                  <td><button onClick={() => handleDelete(todo._id)} className='delete'>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
      </div>


    </div>
  )
}

export default Todo
