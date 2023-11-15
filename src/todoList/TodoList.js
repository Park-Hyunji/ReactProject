import {useRef} from 'react';
import './todoList.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { LocationOff } from '@mui/icons-material';

function TodoList(){

  const[todoList,setTodoList] = useState([]);
  const[sequance,setSequance] = useState(null);
  const refTodoItem = useRef();

  useEffect(()=>{
    let sequance = window.localStorage.getItem("sequence")
    if(sequance===null){
      window.localStorage.setItem("sequance","0")
      sequance=0
    }
    const handleSetInit=()=>{
      window.localStorage.setItem("todoList","[]")
      return "[]"
    }
    let todo=JSON.parse(window.localStorage.getItem("todoList")??handleSetInit());

    setTodoList(todo)
    setSequance(Number(sequance))

  },[])

  const handleTodoAdd = (item)=>{
    if(sequance===null){
      return
    }
    let todo=[...todoList]

    todo.push({tf:false,id:sequance+1,text:item})

    window.localStorage.setItem("todoList",JSON.stringify(todo));
    window.localStorage.setItem("sequance",String(sequance+1));

    setTodoList(todo)
    setSequance(sequance+1)
    refTodoItem.current.value=''
  }

  const handleTodoCheck=(tf,idx)=>{
    let todo = [...todoList]
    todo[idx].tf = LocationOff
    
    window.localStorage.setItem("todoList",JSON.stringify(todo));
    setTodoList(todo)
  }

  const handleTodoDelete = (id) =>{
    let todo=[...todoList]
    todo = todo.filter((val)=>val.id !==id);

    window.localStorage.setItem("todoList",JSON.stringify(todo));
    setTodoList(todo)
  }

  return(
    <div className='mainLayout'>
      <div className='todoLayout'>
        <div className='todoTop'>
         <div className='todoTitle'>
          TODO LIST
          </div>
        <div className='todoAdd'>
          <input type="text" placeholder='할 일을 입력'
          ref={refTodoItem}/>
          <div onClick={()=>handleTodoAdd(refTodoItem.current.value)}>
          +
          </div>
        </div>
        <div className='listLayout'>
          {todoList.map((val,idx)=>

            <div className='todoItem' key={idx}>
            <div className='todoCheckBox' onClick={()=>handleTodoCheck(val.tf,idx)}>
              <div className='checkIcon'>
                {val.tf?'v':''}
              </div>
              <span>{val.text}</span>
            </div>
              <div className='deleteBox' onClick={()=>handleTodoDelete(val.id)}>
                x
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );

}

export default TodoList;