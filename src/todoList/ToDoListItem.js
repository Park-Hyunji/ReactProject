import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
} from 'react-icons/md';
import './ToDoListItem.css';
import cn from 'classnames';

function ToDoListItem({
  todo,
  onRemove,
  onToggle,
  style
}) {
  const { id, text, checked } = todo;
  return (
    <div className="TodoListItem-virtualized" style={style}>
      <li className="TodoListItem">
        <div
          className={cn('checkbox', { checked: checked })}
          onClick={() => onToggle(id)}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </li>
    </div>
  );
}

export default React.memo(ToDoListItem);