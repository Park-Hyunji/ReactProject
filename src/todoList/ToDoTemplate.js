import "./ToDoTemplate.css";
import { useState, useRef, useCallback } from 'react';
import ToDoInsert from './ToDoInsert';
import TodoList from './TodoList';


function ToDoTemplate() {
    const [todos, setTodos] = useState([
      {
        id: 1,
        text: '리액트를 이용한 프로젝트 만들기',
        checked: true,
      },
      {
        id: 2,
        text: '컴포넌트 나누기',
        checked: true,
      },
      {
        id: 3,
        text: '이번주 일정 확인하기',
        checked: false,
      },
    ]);
    const [setSelectedTodo] = useState(null);
    
    const nextId = useRef(4);
    
    const onChangeSelectedTodo = (todo) => {
      setSelectedTodo((selectedTodo) => todo);
    };
  
    const onInsert = useCallback((text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos((todos) => todos.concat(todo)); 
      nextId.current++; 
    }, []);
  
    const onRemove = useCallback((id) => {
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    }, []);
    
    const onToggle = useCallback((id) => {
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    }, []);
    return (
      <>
        <ToDoInsert 
        onInsert={onInsert} />
        <TodoList
          todos={todos}
          onToggle={onToggle}
          onRemove={onRemove}
          onChangeSelectedTodo={onChangeSelectedTodo}
        />
      </>
    );
  }

export default ToDoTemplate;