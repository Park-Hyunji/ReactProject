import React, { useCallback } from 'react';
import ToDoListItem from './ToDoListItem';
import './todoList.css';
import {List} from 'react-virtualized'

function TodoList({ todos, onRemove, onToggle, onChangeSelectedTodo}) {
  const rowRender = useCallback(
    ({index,key,style}) => {
      const todo = todos[index];
      return(
        <ToDoListItem
        todo={todo}
        key={key}
        onToggle={onToggle}
        onRemove={onRemove}
        onChangeSelectedTodo={onChangeSelectedTodo}
        style={style}
      />
      )
    },
    [ todos, onRemove, onToggle, onChangeSelectedTodo ]
  )
  
  return (
    <List 
      className='TodoList'
      width={480} 
      height={450}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRender}
      list={todos}
      style={{outline:'none'}} 
    />
  );
}

export default React.memo(TodoList);