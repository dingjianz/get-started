import {
  FC,
  ReactElement,
  useCallback,
  // useState,
  useEffect,
  useReducer,
} from 'react';
import { TodoInput, TodoItem, todoReducer } from 'components/todolist';
import { ITodoType } from 'enum/todoList';

import './index.scss';

const initialState: ITodoList.IState = {
  todoList: [],
};

const TodoList: FC = (): ReactElement => {
  // const [todoList, setTodoList] = useState<ITodoList.ITodo[]>([]);

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodoItem = useCallback((todoItem: ITodoList.ITodo): void => {
    // setTodoList((todoList) => [...todoList, todoItem]);
    dispatch({
      type: ITodoType.ADD_TODOITEM,
      payload: todoItem,
    });
  }, []);

  const removeTodoItem = useCallback((id: number): void => {
    dispatch({
      type: ITodoType.REMOVE_TODOITEM,
      payload: id,
    });
  }, []);

  const handleToggleTodoItem = useCallback((id: number): void => {
    dispatch({
      type: ITodoType.TODDLE_TODOITEM,
      payload: id,
    });
  }, []);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('todoList') || '[]');
    dispatch({
      type: ITodoType.SET_TODOLIST,
      payload: list,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(state.todoList));
  }, [state.todoList]);

  return (
    <div className="todo-list">
      <TodoInput
        {...{
          addTodoItem,
          todoList: state.todoList,
        }}
      />
      <div className="todo-list">
        {state.todoList.map((todoItem: ITodoList.ITodo, index: number) => (
          <TodoItem
            {...{
              key: index,
              todoItem,
              handleToggleTodoItem,
              removeTodoItem,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
