/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC,
  ReactElement,
  useCallback,
  // useState,
  useReducer,
} from "react";
import { TodoInput, TodoItem, todoReducer } from "components/todolist";
import { ITodoType } from "enum/todoList";

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

  return (
    <div className="todo-list">
      <TodoInput
        {...{
          addTodoItem,
          todoList: state.todoList,
        }}
      />
      <TodoItem />
    </div>
  );
};

export default TodoList;
