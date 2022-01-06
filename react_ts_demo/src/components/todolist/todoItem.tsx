import { FC, ReactElement, memo } from 'react';
import styles from './index.module.scss';

interface IProps {
  todoItem: ITodoList.ITodo;
  handleToggleTodoItem(id: number): void;
  removeTodoItem: (id: number) => void;
}

const TodoItem: FC<IProps> = ({
  todoItem,
  handleToggleTodoItem,
  removeTodoItem,
}): ReactElement => {
  const { id, content, isCompleted } = todoItem;
  return (
    <div className={styles.todo_item}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => handleToggleTodoItem(id)}
      />
      <span
        style={{
          textDecoration: isCompleted ? 'line-through' : 'none',
        }}
      >
        {content}
      </span>
      <button type="button" onClick={removeTodoItem.bind(this, id)}>删除</button>
    </div>
  );
};

export default memo(TodoItem);
