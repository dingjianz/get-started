import { ITodoType } from 'enum/todoList';

const todoReducer = (state: ITodoList.IState, action: ITodoList.IAction): ITodoList.IState => {
  const { type, payload } = action;
  switch (type) {
    case ITodoType.SET_TODOLIST:
      return {
        ...state,
        todoList: payload as ITodoList.ITodo[],
      };
    case ITodoType.ADD_TODOITEM:
      return {
        ...state,
        todoList: [...state.todoList, payload as ITodoList.ITodo],
      };
    case ITodoType.REMOVE_TODOITEM:
      return {
        ...state,
        todoList: state.todoList.filter((item) => item.id !== payload),
      };
    case ITodoType.TODDLE_TODOITEM:
      return {
        ...state,
        todoList: state.todoList.map((todoItem) => (todoItem.id === payload
          ? { ...todoItem, isCompleted: !todoItem.isCompleted }
          : todoItem)),
      };
    default:
      return state;
  }
};

export default todoReducer;
