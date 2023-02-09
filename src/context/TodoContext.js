import { createContext, useEffect, useState } from "react";
import request from "../lib/request";

const TodoContext = createContext(undefined);

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    if (refetch) {
      request("/todos")
        .then((res) => setTodos(res.data))
        .catch((err) => console.log(err))
        .finally(() => setRefetch(false));
    }
  }, [refetch]);

  const getTodos = () => todos;

  const openTodoModal = () => setOpenModal(true);
  const closeTodoModal = () => setOpenModal(false);

  return (
    <TodoContext.Provider
      value={{ getTodos, openTodoModal, closeTodoModal, openModal, setRefetch }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext };
export default TodoProvider;
