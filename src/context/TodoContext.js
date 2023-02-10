import { createContext, useEffect, useState } from "react";
import request from "../lib/request";

const TodoContext = createContext(undefined);

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [refetch, setRefetch] = useState(true);
  const [mode, setMode] = useState("create");
  const [selectedId, setSelectedId] = useState(-1);

  useEffect(() => {
    if (refetch) {
      request("/todos")
        .then((res) => setTodos(res.data))
        .catch((err) => console.log(err))
        .finally(() => setRefetch(false));
    }
  }, [refetch]);

  const getTodos = (id) => (id ? todos.find((todo) => todo.id === id) : todos);

  const openTodoModal = (id) => {
    if (typeof id === "number") {
      setMode("edit");
      setSelectedId(id);
    }

    setOpenModal(true);
  };
  
  const closeTodoModal = () => {
    setMode("create");
    setSelectedId(-1);
    setOpenModal(false);
  };

  return (
    <TodoContext.Provider
      value={{
        getTodos,
        openTodoModal,
        closeTodoModal,
        openModal,
        setRefetch,
        mode,
        selectedId,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext };
export default TodoProvider;
