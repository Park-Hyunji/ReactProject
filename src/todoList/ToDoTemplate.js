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
        text: '컴포넌트 스타일링하기',
        checked: true,
      },
      {
        id: 3,
        text: '이번주 일정 확인하기',
        checked: false,
      },
    ]);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [setInsertToggle] = useState(false);
  
    const nextId = useRef(4);
    const onInsertToggle = useCallback(() => {
      if (selectedTodo) {
        setSelectedTodo((selectedTodo) => null);
      }
      setInsertToggle((prev) => !prev);
    }, [selectedTodo]);
  
    const onChangeSelectedTodo = (todo) => {
      setSelectedTodo((selectedTodo) => todo);
    };
  
    const onInsert = useCallback((text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos((todos) => todos.concat(todo)); //concat(): 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열 반환
      nextId.current++; //nextId 1씩 더하기
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
          onInsertToggle={onInsertToggle}
        />
        
      </>
    );
  }

export default ToDoTemplate;