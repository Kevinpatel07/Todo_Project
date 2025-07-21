import  { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { CircleCheckBig } from 'lucide-react';

const BaseURL = "http://localhost:7999/todos"

const Todo = () => {
  const data = useRef("")
  const [todos, settodos] = useState([])


// Add Todo
  const handleADD = async() => {
    const todoText = data.current.value.trim()
    if(!todoText) return;

    const addTodo = await axios.post(`${BaseURL}/add-todo` , {task:todoText})
    settodos([...todos , addTodo.data])
    readTodo()
    data.current.value = ""
  }

//  Read Todo
  const readTodo = async()=>{
     const readtodo = await axios.get(`${BaseURL}/read-todo`)
     settodos(readtodo.data.message)
  }

// Delete Todo
  const handleDelete = async(id)=>{
    await axios.delete(`${BaseURL}/delete-todo/${id}`)
    readTodo()
  }


  useEffect(()=>{
    readTodo()
  },[])

  return (
    <div className='parent'>
      <div className='Todo'>
        <h1 className='To'>TO</h1>
        <h1 className='Do'>D<CircleCheckBig size={24} /></h1>
      </div>

      <div className='insert'>
        <input ref={data} type="text" placeholder='What do you need to do?' />
        <button onClick={handleADD}>ADD</button>
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
                  <td style={{transform:"scale(1.2)"}}><input type="checkbox" /></td>
                  <td><h3>{todo.task}</h3></td>
                  <td><button className='edit'>edit</button></td>
                  <td><button onClick={()=>handleDelete(todo._id)} className='delete'>Delete</button></td>
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
