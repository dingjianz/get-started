declare namespace ITodoList {
  interface ITodo {
    id: number;
    content: string;
    isCompleted: boolean;
  }

  interface IState {
    todoList: Todo[];
  }

  interface IAction {
    type: ITodoType;
    payload: ITodo | ITodo[] | number;
  }

  enum ITodoType {
    ADD_TODOITEM = "ADD_TODOITEM",
    REMOVE_TODOITEM = "REMOVE_TODOITEM",
    TODDLE_TODOITEM = "TODDLE_TODOITEM",
    SET_TODOLIST = "SET_TODOLIST",
  }
}
