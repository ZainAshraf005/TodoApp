import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import react from './assets/react.svg'
import { useState, useRef, useEffect } from 'react'

const App = () => {

  const [todo, setTodo] = useState("")
  const [task, setTask] = useState("Add Task")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  const ref = useRef(null)


  useEffect(() => {


    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }, [])


  const saveToLS = (param) => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }


  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }







  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleAdd = () => {
    setTask("Add Task")

    if (!(todo.length <= 3)) {

      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      setTodo("")

      saveToLS()
      scroll()
    }

    


  }
  const handleEdit = (id) => {
    setTask("Save Task")
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    })

    setTodos(newTodos)

    document.querySelector("input[type=text]").focus()

    saveToLS()
    // scrollTop()
  }
  const handleDelete = (id, todo) => {
    console.log(`this is deleting ${id}`)
    // var result = confirm(`Are you sure you want to delete "${todo}" ?`)
    // if (result) {

    let newTodos = todos.filter(item => {
      return item.id !== id
    })
  // }
    setTodos(newTodos)

    saveToLS()


  }

  const handleCheckBox = (e) => {



    let id = e.target.name

    const isChecked = e.target.checked;

    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: isChecked };
      }
      return todo;
    }));


    saveToLS()



  }







  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      handleAdd()
    }

  })







  return (
    <div className='flex justify-center items-center h-screen' >
      <main className='rounded-xl relative overflow-hidden border-b-4 border-zinc-900  w-[90vw] lg:w-[50vw] bg-zinc-900 min-h-[89vh] max-h-[89vh]'>

        <div className="top h-[30%]">


          <div className="flex justify-between items-center p-3 mb-4 bg-zinc-700">
            <div className="flex items-center justify-center">
            <img className='w-[40%] md:w-[40%] lg:w-full animate-spin-slow' src={react} alt="" />
            <h2 className=' text-2xl font-semibold'>MyTodo</h2>
            </div>
            <div className="flex items-center gap-3">

              <input onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="show" className='w-4 h-4  ring-1 ring-zinc-700 checked:ring-green-500' />
              <label htmlFor="show">Show Finished</label>
            </div>
          </div>
          <div className='flex justify-around items-center gap-4 p-3 h-full'>
            <input onChange={handleChange} value={todo} placeholder='click here to add new task' className='bg-zinc-800 caret-zinc-500 capitalize  focus:placeholder-transparent focus:outline-none rounded-lg p-2 lg:p-3 w-[70%]' type="text" />
            <button onClick={handleAdd} className='rounded-lg  bg-zinc-700 w-[30%] p-2 lg:p-3 whitespace-nowrap'>{task}</button>
          </div>


        </div>


        <div className="bottom h-[70%] overflow-hidden flex justify-start flex-col">
          <div ref={ref} className='scroll flex  flex-col gap-2 overflow-y-scroll thumb max-h-[28rem] mt-5  w-full  '>

            {todos.length === 0 && <div className='w-full flex justify-center items-center h-full mt-48'>
              <div>no todos to show</div>
            </div>}
            {todos.map((item) => {



              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between px-2 mx-2  py-4 items-center rounded-lg bg-zinc-800">
                <div className="flex-1 flex justify-start">
                  <div className='rounded-md  h-5 overflow-hidden'>
                  <input type="checkbox" onChange={handleCheckBox} checked={item.isCompleted} name={item.id} id="" className='w-4 h-4   ring-1 ring-zinc-700 checked:ring-green-500  ' />
                  </div>

                </div>
                <h2 className='text-ellipsis capitalize flex justify-center flex-1'>
                  <div className={item.isCompleted ? "line-through" : ""}>

                    {item.todo}
                  </div>
                </h2>
                <div className='flex-1 flex justify-end'>
                  <div className="buttons flex flex-col lg:flex-row gap-2 ">

                    <button onClick={(e) => { handleEdit(item.id) }} className='rounded-lg bg-green-600 px-3 py-1'><BiEdit /></button>
                    <button onClick={(e) => { handleDelete(item.id, item.todo) }} className='rounded-lg bg-red-600 px-3 py-1'><MdDelete /></button>
                  </div>
                </div>
              </div>

            })}

          </div>
        </div>
      </main>
    </div>
  )
}

export default App
