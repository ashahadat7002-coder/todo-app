import React from 'react'
import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const[task,setTask] = useState("");
  const[todos,setTodos] = useState(() =>{
    const savedTodos = localStorage.getItem("todos");
    return savedTodos? JSON.parse(savedTodos):[];
  })
  const addTodo  = ()=>{
    if  (task.trim() === "")return;
    const newTodo ={
      id:Date.now(),
      text:task,
      completed:false,
    };
    setTodos([...todos,newTodo]);
    setTask("");
  }
  const deleteTodo =(id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  const toggleTodo=(id) => {
    const updatedTodos = todos.map((todo)=> todo.id === id?{...todo,completed:!todo.completed}:todo);
    setTodos(updatedTodos);
  }
  useEffect(() =>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos]);
  const getTotalTodos = () => {
    return todos.length;
  }
  const getCompletedTodos = () =>{
    return todos.filter((todo) => ! todo.completed).length;
  }
  const getPendingTodos = () => {
    return todos.filter((todo) => ! todo.completed).length;
  }
  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  }
  
  return (
    <div className='container'>
      <h1>Todo App</h1>
      <div className='input-group'>
        <input type="text"value={task}onChange={(e) => setTask(e.target.value)}onKeyDown={(e) =>{if(e.key === "Enter"){addTodo();}}} />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className='counter'>
        <span>Total:<strong>{getTotalTodos()}</strong></span>
        <span>Completed:<strong>{getCompletedTodos()}</strong></span>
        <span>Pending:<strong>{getPendingTodos()}</strong></span>
      </div>
      <h2>Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed?"completed":""}`}>
            <div className='todo-content'>
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
              <span>{todo.text}</span>
            </div>
            
            <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
          </li>
          
        ))}
      </ul>
      <button className='clear-btn'onClick={clearCompleted}>Clear</button>
      
    </div>
  )
}

export default App